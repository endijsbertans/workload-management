package workloadmanagement.teachingstaff;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.auth.security.MyUser;

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
    @JoinColumn(name = "user_id", nullable = false)
    private MyUser user;

    private String name;

    private String surname;

    private String positionTitle;

    @ManyToOne
    @JoinColumn(name="staff_faculty_id")
    private Faculty staffFaculty;

    @ManyToOne
    @JoinColumn(name="staff_academic_rank_id")
    private AcademicRank staffAcademicRank;

    private String staffPhoto;
    public String getStaffFullName(){
        return name + " " + surname;
    }
    public String getRankFullName(){
        return staffAcademicRank.getAbbreviation() + getStaffFullName();
    }
}