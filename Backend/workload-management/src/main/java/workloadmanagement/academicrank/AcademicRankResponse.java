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
    private String abbreviation;
    private boolean isDeleted;
}
