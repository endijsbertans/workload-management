package workloadmanagement.teachingstaff;

import lombok.*;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.auth.security.MyUser;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeachingStaffResponse {

    private int teachingStaffId;
    private MyUser user;
    private Faculty staffFaculty;
    private String positionTitle;
    private AcademicRank staffAcademicRank;
    private byte[] staffPhoto;
    private String staffFullName;
    private String rankFullName;
}
