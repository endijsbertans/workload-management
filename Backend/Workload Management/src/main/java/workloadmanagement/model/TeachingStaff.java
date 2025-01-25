package workloadmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
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
    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
    private String positionTitle;

    @ManyToOne
    @JoinColumn(name="staff_faculty_id")
    private Faculty staffFacultyId;

    @ManyToOne
    @JoinColumn(name="staff_academic_rank_id")
    private AcademicRank staffAcademicRankId;
}