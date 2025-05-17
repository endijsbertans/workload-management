package workloadmanagement.semester;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@ToString
public class Semester {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int semesterId;
    private SemesterEnum semesterName;
    private int semesterYear;
    private boolean isDeleted;
}
