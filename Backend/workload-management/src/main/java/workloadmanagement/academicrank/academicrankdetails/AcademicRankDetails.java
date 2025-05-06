package workloadmanagement.academicrank.academicrankdetails;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.semester.Semester;
@Entity
@Getter
@Setter
@AllArgsConstructor
@SuperBuilder
@NoArgsConstructor
@ToString
public class AcademicRankDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int academicRankDetailsId;

    private double  cpForFullTime;

    private double salary;
    private double contactHoursForFullTime;

    @ManyToOne
    @JoinColumn(name="semester_id")
    private Semester semester;

    @ManyToOne
    @JoinColumn(name="academic_rank_id")
    private AcademicRank academicRank;
    private boolean isDeleted;
}
