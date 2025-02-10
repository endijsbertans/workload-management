package workloadmanagement.teachingstaff;

import org.springframework.stereotype.Service;
import workloadmanagement.auth.security.MyUser;
import workloadmanagement.faculty.Faculty;

@Service
public class TeachingStaffMapper {
    // TODO make response to tSTaff
    public TeachingStaff toTeachingStaff(TeachingStaffRequest request, Faculty staffFaculty) {
        return TeachingStaff.builder()
                .name(request.name())
                .surname(request.surname())
                .positionTitle(request.positionTitle())
                .staffFaculty(staffFaculty)
                //.staffAcademicRank(request.staffAcademicRank())
                //.staffPhoto(request.staffPhoto())
                .build();
    }

    public TeachingStaffResponse toTeachingStaffResponse(TeachingStaff teachingStaff) {
        return TeachingStaffResponse.builder()
                .teachingStaffId(teachingStaff.getTeachingStaffId())
                .name(teachingStaff.getName())
                .surname(teachingStaff.getSurname())
                .user(teachingStaff.getUser())
                .positionTitle(teachingStaff.getPositionTitle())
                .staffFaculty(teachingStaff.getStaffFaculty())
                .staffAcademicRank(teachingStaff.getStaffAcademicRank())
                .staffFullName(teachingStaff.getStaffFullName())
                .rankFullName(teachingStaff.getRankFullName())
                //.staffPhoto() TODO
                .build();
    }
}
