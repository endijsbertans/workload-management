package workloadmanagement.teachingstaff;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetails;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.auth.security.MyUser;
import workloadmanagement.statustype.StatusType;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class TeachingStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teachingStaffId;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private MyUser user;

    private String name;

    private String surname;

    @ManyToOne
    @JoinColumn(name = "status_status_type_id")
    private StatusType status;

    @ManyToOne
    @JoinColumn(name="staff_faculty_id")
    private Faculty staffFaculty;

    @ManyToOne
    @JoinColumn(name="staff_academic_rank_id")
    private AcademicRank staffAcademicRank;

    private String positionTitle;

    private String staffPhoto;
    private boolean isDeleted;
    @Transient
    public String getStaffFullName(){
        return name + " " + surname;
    }
    @Transient
    public String getRankFullName(){
        return positionTitle + " " + getStaffFullName();
    }

}