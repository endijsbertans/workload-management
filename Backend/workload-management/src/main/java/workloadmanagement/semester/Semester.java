package workloadmanagement.semester;

import jakarta.persistence.*;
import lombok.*;


@Entity // by default takes class name as its database name so in this case “Semester”
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@ToString
public class Semester {
    @Id // marks semesterId as primary key
    @GeneratedValue
            (strategy = GenerationType.IDENTITY) // passes id generation to database
    private int semesterId;
    private SemesterEnum semesterName;
    private int semesterYear;
    private boolean isDeleted;
}

