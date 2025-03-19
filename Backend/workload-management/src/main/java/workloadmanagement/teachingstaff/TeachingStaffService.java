package workloadmanagement.teachingstaff;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.AcademicRankService;
import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetails;
import workloadmanagement.auth.AuthenticationService;
import workloadmanagement.auth.RegistrationRequest;
import workloadmanagement.auth.security.MyUser;
import workloadmanagement.auth.security.MyUserService;
import workloadmanagement.course.Course;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.faculty.FacultyService;
import workloadmanagement.repo.ITeachingStaffRepo;
import workloadmanagement.semester.Semester;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.statustype.StatusTypeService;
import workloadmanagement.workload.WorkloadRequest;
import workloadmanagement.workload.WorkloadService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class TeachingStaffService{
    private final TeachingStaffMapper tStaffMapper;
    private final ITeachingStaffRepo tStaffRepo;
    private final AuthenticationService authService;
    private final MyUserService userService;
    private final FacultyService facultyService;
    private final AcademicRankService academicRankService;
    private final StatusTypeService statusTypeService;

    public Integer save(TeachingStaffRequest request) throws MessagingException {
        TStaffEntities tStaffEntities = resolveEntities(request);

        TeachingStaff tStaff = tStaffMapper.toTeachingStaff(request, tStaffEntities);
        tStaffRepo.save(tStaff);
        if(request.authDetails() != null) {
            authService.registerTeachingStaff(request.authDetails(), tStaff);
            MyUser user = userService.findByEmail(request.authDetails().getEmail());
            tStaff.setUser(user);
        }
        return tStaffRepo.save(tStaff).getTeachingStaffId();
    }

    public TeachingStaff findTeachingStaffFromResponseId(int id) {
        return tStaffRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Teaching staff with id: " + id + " not found."));
    }
    public TeachingStaffResponse findById(Integer tstaffId) {
        return tStaffRepo.findById(tstaffId)
                .map(tStaffMapper::toTeachingStaffResponse)
                .orElseThrow(() -> new EntityNotFoundException("Teaching staff with id: " + tstaffId + " not found."));
    }

    public List<TeachingStaffResponse> findAllTeachingStaff() {
        List<TeachingStaff> staff = tStaffRepo.findByIsDeletedFalse();
        return staff.stream()
                .map(tStaffMapper::toTeachingStaffResponse)
                .toList();
    }


    public Integer update(Integer tStaffId, @Valid TeachingStaffRequest request) {
        TeachingStaff existingStaff = findTeachingStaffFromResponseId(tStaffId);
        TStaffEntities tStaffEntities = resolveEntities(request);

        TeachingStaff updatedStaff = tStaffMapper.toTeachingStaff(request, tStaffEntities);
        updatedStaff.setTeachingStaffId(existingStaff.getTeachingStaffId());
        MyUser user = userService.findByEmail(existingStaff.getUser().getEmail());
        user.setEmail(request.authDetails().getEmail());
        updatedStaff.setUser(existingStaff.getUser());

        return tStaffRepo.save(updatedStaff).getTeachingStaffId();
    }

    // gets objects from database using their response ids
    private TStaffEntities resolveEntities(TeachingStaffRequest request) {
        Faculty faculty = facultyService.findFacultyFromResponseId(request.staffFacultyId());
        AcademicRank academicRank = academicRankService.findAcademicRankFromResponseId(request.staffAcademicRankId());
        StatusType statusType = statusTypeService.findStatusTypeFromResponseId(request.statusId());
        return new TStaffEntities(faculty, academicRank, statusType);
    }
    private TStaffEntities resolveEntities(TeachingStaffCsvRepresentation csvRepresentation) {
        Faculty faculty = facultyService.findFacultyFromResponseId(csvRepresentation.getStaffFacultyId());
        AcademicRank academicRank = academicRankService.findAcademicRankFromResponseId(csvRepresentation.getStaffAcademicRankId());
        StatusType statusType = statusTypeService.findStatusTypeFromResponseId(csvRepresentation.getStatusId());
        return new TStaffEntities(faculty, academicRank, statusType);
    }
    public Integer delete(Integer tStaffId) {
        TeachingStaff staff = findTeachingStaffFromResponseId(tStaffId);
        staff.setDeleted(true);
        tStaffRepo.save(staff);
        return tStaffId;
    }

    public Integer uploadTeachingStaff(MultipartFile file) throws IOException {
        Set<TeachingStaff> tStaff = parseCsv(file);
        tStaffRepo.saveAll(tStaff);
        return tStaff.size();
    }
    @Transactional
    protected Set<TeachingStaff> parseCsv(MultipartFile file) throws IOException {
        try(Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))){
            HeaderColumnNameMappingStrategy<TeachingStaffCsvRepresentation> strategy = new HeaderColumnNameMappingStrategy<>();
            strategy.setType(TeachingStaffCsvRepresentation.class);
            CsvToBean<TeachingStaffCsvRepresentation> csvToBean =
                    new CsvToBeanBuilder<TeachingStaffCsvRepresentation>(reader)
                            .withMappingStrategy(strategy)
                            .withIgnoreEmptyLine(true)
                            .withIgnoreLeadingWhiteSpace(true)
                            .withSeparator(';')
                            .build();

            return csvToBean.parse()
                    .stream()
                    .map(csvLine -> {
                        TStaffEntities entities = resolveEntities(csvLine);
                        TeachingStaff staff = tStaffMapper.toTeachingStaff(csvLine, entities);
                        tStaffRepo.save(staff);
                        try {
                            if(csvLine.getEmail() != null && !csvLine.getEmail().isEmpty()) {
                                var registrationRequest = RegistrationRequest.builder()
                                        .email(csvLine.getEmail())
                                                .build();
                                authService.registerTeachingStaff(registrationRequest, staff);
                                MyUser user = userService.findByEmail(csvLine.getEmail());
                                staff.setUser(user);
                                tStaffRepo.save(staff);
                            }
                        } catch (MessagingException e) {
                            throw new RuntimeException("Failed to register user with email: " + csvLine.getEmail(), e);
                        }

                        return staff;
                    })
                    .collect(Collectors.toSet());
        }
    }


    public record TStaffEntities(
            Faculty faculty,
            AcademicRank academicRank,
            StatusType statusType
    ) {}

}
