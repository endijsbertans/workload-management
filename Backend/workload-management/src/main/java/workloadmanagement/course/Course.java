package workloadmanagement.course;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@ToString
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;

    private String courseCode;

    private String courseName;

    private double creditPoints;

    private String registrationType;
    
    private String section;
    private boolean isDeleted;
}
