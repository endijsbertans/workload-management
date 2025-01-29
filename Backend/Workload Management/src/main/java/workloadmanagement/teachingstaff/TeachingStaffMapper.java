package workloadmanagement.teachingstaff;

import org.springframework.stereotype.Service;

@Service
public class TeachingStaffMapper {

    public TeachingStaff toTeachingStaff(TeachingStaffRequest request) {
        return TeachingStaff.builder()
                .user(request.user())
                .positionTitle(request.positionTitle())
                .staffFacultyId(request.staffFacultyId())
                .staffAcademicRankId(request.staffAcademicRankId())
                .staffPhoto(request.staffPhoto())
                .build();
    }

    public TeachingStaffResponse toTeachingStaffResponse(TeachingStaff teachingStaff) {
        return TeachingStaffResponse.builder()
                .teachingStaffId(teachingStaff.getTeachingStaffId())
                .user(teachingStaff.getUser())
                .positionTitle(teachingStaff.getPositionTitle())
                .staffFacultyId(teachingStaff.getStaffFacultyId())
                .staffAcademicRankId(teachingStaff.getStaffAcademicRankId())
                //.staffPhoto() TODO
                .build();
    }
}
