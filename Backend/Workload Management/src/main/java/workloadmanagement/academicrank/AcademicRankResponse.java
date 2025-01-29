package workloadmanagement.academicrank;
import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AcademicRankResponse {
    private int academicRankId;
    private String rankName;
    private double  cpForSpring;
    private double cpForAutumn;
    private String abbreviation;
    private double salary;
}
