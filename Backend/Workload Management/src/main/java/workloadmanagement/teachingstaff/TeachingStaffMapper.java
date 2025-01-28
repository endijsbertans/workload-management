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
}
