package workloadmanagement.academicrank;
import lombok.*;
import workloadmanagement.semester.SemesterEnum;

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
