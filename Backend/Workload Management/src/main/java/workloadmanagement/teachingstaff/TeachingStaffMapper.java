package workloadmanagement.teachingstaff;

import org.springframework.stereotype.Service;

@Service
public class TeachingStaffMapper {

    public TeachingStaff toTeachingStaff(TeachingStaffRequest request) {
        return TeachingStaff.builder()
                .name(request.name())
                .surname(request.surname())
                .user(request.user())
                .positionTitle(request.positionTitle())
                .staffFaculty(request.staffFaculty())
                .staffAcademicRank(request.staffAcademicRank())
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
