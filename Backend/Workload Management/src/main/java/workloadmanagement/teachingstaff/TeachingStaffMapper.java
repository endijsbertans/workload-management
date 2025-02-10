package workloadmanagement.teachingstaff;

import org.springframework.stereotype.Service;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.faculty.Faculty;

@Service
public class TeachingStaffMapper {

    public TeachingStaff toTeachingStaff(TeachingStaffRequest request, Faculty staffFaculty, AcademicRank staffAcademicRank) {
        return TeachingStaff.builder()
                .name(request.name())
                .surname(request.surname())
                .positionTitle(request.positionTitle())
                .staffFaculty(staffFaculty)
                .staffAcademicRank(staffAcademicRank)
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
