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
    public Integer save(TeachingStaffRequest request) throws MessagingException {
        Faculty faculty = facultyService.findFacultyFromResponse(request.staffFaculty());
        AcademicRank staffAcademicRank = academicRankService.findAcademicRankFromResponse(request.staffAcademicRank());
        TeachingStaff tStaff = tStaffMapper.toTeachingStaff(request, faculty, staffAcademicRank);
        tStaffRepo.save(tStaff);
        if(request.authDetails() != null) {
            authService.registerTeachingStaff(request.authDetails(), tStaff);
            MyUser user = userService.findByEmail(request.authDetails().getEmail());
            tStaff.setUser(user);
        }
        return tStaffRepo.save(tStaff).getTeachingStaffId();

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
}
