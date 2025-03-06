package workloadmanagement.course;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import workloadmanagement.academicrank.AcademicRank;


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

    @ManyToOne
    private AcademicRank necessaryRank;

    private String registrationType;

    private int studyLevel;
    
    private String section;
}
