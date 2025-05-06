package workloadmanagement.semester;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SemesterResponse {
    private int semesterId;
    private SemesterEnum semesterName;
    private int year;
    private boolean isDeleted;
}
