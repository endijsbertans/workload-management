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
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;

    @Column(name = "course_code")
    private String courseCode;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "credit_points")
    private double creditPoints;

    @ManyToOne
    @JoinColumn(name="necessary_academic_rank_id")
    private AcademicRank necessaryRankId;

    @Column(name = "registration_type")
    private String registrationType;

    @Column(name = "study_level")
    private int studyLevel;

    @Column(name = "section")
    private String section;
}
