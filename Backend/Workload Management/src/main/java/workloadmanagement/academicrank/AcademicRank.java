package workloadmanagement.academicrank;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import workloadmanagement.academicrank.semester.SemesterEnum;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@ToString
public class AcademicRank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int academicRankId;

    private String rankName;

    private double  cpForFullTime;

    private String abbreviation;

    private double salary;

    private SemesterEnum semester;
}
