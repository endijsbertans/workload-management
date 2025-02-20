package workloadmanagement.academicrank;
import lombok.*;
import workloadmanagement.academicrank.semester.SemesterEnum;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AcademicRankResponse {
    private int academicRankId;
    private String rankName;
    private double  cpForFullTime;
    private String abbreviation;
    private double salary;
    private SemesterEnum semester;
}
