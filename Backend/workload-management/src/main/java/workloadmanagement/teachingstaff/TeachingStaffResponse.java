package workloadmanagement.teachingstaff;

import lombok.*;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.auth.security.user.MyUser;
import workloadmanagement.statustype.StatusType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeachingStaffResponse {

    private int teachingStaffId;
    private MyUser user;
    private String name;
    private String surname;
    private Faculty staffFaculty;
    private StatusType status;
    private String positionTitle;
    private AcademicRank staffAcademicRank;
    private byte[] staffPhoto;
    private String staffFullName;
    private String rankFullName;
    private boolean isDeleted;
    private String role;
}
