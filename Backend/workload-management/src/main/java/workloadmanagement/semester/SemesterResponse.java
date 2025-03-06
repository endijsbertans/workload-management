package workloadmanagement.semester;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SemesterResponse {
    private int semesterId;
    private SemesterEnum semesterName;
    private int year;
}
