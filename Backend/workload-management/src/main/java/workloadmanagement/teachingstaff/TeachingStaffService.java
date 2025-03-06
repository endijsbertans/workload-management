package workloadmanagement.teachingstaff;

import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.AcademicRankService;
import workloadmanagement.auth.AuthenticationService;
import workloadmanagement.auth.security.MyUser;
import workloadmanagement.auth.security.MyUserService;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.faculty.FacultyService;
import workloadmanagement.repo.ITeachingStaffRepo;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.statustype.StatusTypeService;

import java.util.List;


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
        Faculty faculty = facultyService.findFacultyFromResponseId(request.staffFacultyId());
        AcademicRank staffAcademicRank = academicRankService.findAcademicRankFromResponseId(request.staffAcademicRankId());
        StatusType statusType = statusTypeService.findStatusTypeFromResponseId(request.statusId());
        String positionTitle = staffAcademicRank.getRankName();
        if(statusType.getStatusTypeName().contentEquals("ievēlētie")){
            positionTitle = shortenRankName(positionTitle);
        }else{
            positionTitle = "vies" + shortenRankName(positionTitle);
        }
        TeachingStaff tStaff = tStaffMapper.toTeachingStaff(request, faculty, staffAcademicRank,positionTitle ,statusType);
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
        List<TeachingStaff> staff = (List<TeachingStaff>) tStaffRepo.findAll();
        return staff.stream()
                .map(tStaffMapper::toTeachingStaffResponse)
                .toList();
    }
    private String shortenRankName(String rankName) {
        if (rankName == null || rankName.isEmpty()) {
            return "";
        }

        String[] words = rankName.split("\\s+");
        StringBuilder shortened = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            shortened.append(word.length() > 4 ? word.substring(0, 4) : word);
            shortened.append(". ");
        }
        return shortened.toString();
    }
}
