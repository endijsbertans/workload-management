package workloadmanagement.teachingstaff;

import org.springframework.stereotype.Service;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.teachingstaff.TeachingStaffService.TStaffEntities;

@Service
public class TeachingStaffMapper {

    public TeachingStaff toTeachingStaff(TeachingStaffRequest request, TStaffEntities tStaffEntities
                                         ) {
        return TeachingStaff.builder()
                .name(request.name())
                .surname(request.surname())
                .positionTitle(generatePositionTitle(tStaffEntities.academicRank(), tStaffEntities.statusType()))
                .status(tStaffEntities.statusType())
                .staffFaculty(tStaffEntities.faculty())
                .staffAcademicRank(tStaffEntities.academicRank())
                .isDeleted(false)
                //.staffPhoto(request.staffPhoto())
                .build();
    }

    public TeachingStaffResponse toTeachingStaffResponse(TeachingStaff teachingStaff) {
        boolean isAdmin = false;
        if (teachingStaff.getUser() != null) {
            isAdmin = teachingStaff.getUser().getAuthorities().stream()
                    .anyMatch(auth -> "ADMIN".equals(auth.getAuthority()));
        }

        return TeachingStaffResponse.builder()
                .teachingStaffId(teachingStaff.getTeachingStaffId())
                .name(teachingStaff.getName())
                .surname(teachingStaff.getSurname())
                .user(teachingStaff.getUser())
                .positionTitle(teachingStaff.getPositionTitle())
                .status(teachingStaff.getStatus())
                .staffFaculty(teachingStaff.getStaffFaculty())
                .staffAcademicRank(teachingStaff.getStaffAcademicRank())
                .staffFullName(teachingStaff.getStaffFullName())
                .rankFullName(teachingStaff.getRankFullName())
                .isDeleted(teachingStaff.isDeleted())
                .admin(isAdmin)
                //.staffPhoto() TODO
                .build();
    }
    public TeachingStaff toTeachingStaff(TeachingStaffCsvRepresentation csvRepresentation, TStaffEntities tStaffEntities) {
        return TeachingStaff.builder()
                .name(csvRepresentation.getName())
                .surname(csvRepresentation.getSurname())
                .positionTitle(generatePositionTitle(tStaffEntities.academicRank(), tStaffEntities.statusType()))
                .status(tStaffEntities.statusType())
                .staffFaculty(tStaffEntities.faculty())
                .staffAcademicRank(tStaffEntities.academicRank())
                .isDeleted(false)
                .build();
    }
    private String generatePositionTitle(AcademicRank academicRank, StatusType statusType) {
        if(statusType.getStatusTypeName().contentEquals("ievēlētie")) {
            return academicRank.getAbbreviation();
        } else {
            return "vies" + academicRank.getAbbreviation();
        }
    }
}
