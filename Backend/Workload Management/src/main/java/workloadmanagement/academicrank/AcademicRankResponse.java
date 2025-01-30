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
    private double  maxCP;
    private String abbreviation;
    private double salary;
}
