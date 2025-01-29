package workloadmanagement.teachingstaff;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.security.MyUser;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Table(name="teaching_staff")
public class TeachingStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teaching_staff_id")
    private int teachingStaffId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private MyUser user;

    @Column(name = "position_title")
    private String positionTitle;

    @ManyToOne
    @JoinColumn(name="staff_faculty_id")
    private Faculty staffFacultyId;

    @ManyToOne
    @JoinColumn(name="staff_academic_rank_id")
    private AcademicRank staffAcademicRankId;

    private String staffPhoto;
}