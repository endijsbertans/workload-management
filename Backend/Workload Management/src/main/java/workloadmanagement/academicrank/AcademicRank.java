package workloadmanagement.academicrank;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import workloadmanagement.academicrank.semester.Semester;

import java.math.BigDecimal;

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

    @NotNull
    private String rankName;

    @NotNull
    private double  cpForFullTime;

    @NotNull
    private String abbreviation;

    @NotNull
    private double salary;
    @NotNull
    private Semester semester;
}
