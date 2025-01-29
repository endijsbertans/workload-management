package workloadmanagement.teachingstaff;

import lombok.*;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.security.MyUser;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeachingStaffResponse {

    private int teachingStaffId;
    private MyUser user;
    private Faculty staffFacultyId;
    private String positionTitle;
    private AcademicRank staffAcademicRankId;
    private byte[] staffPhoto;
}
