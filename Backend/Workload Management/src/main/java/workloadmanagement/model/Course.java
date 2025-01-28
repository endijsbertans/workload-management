package workloadmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "course")
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Course {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int course_id;

    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
    @Column(name = "course_code")
    private String courseCode;

    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
    @Column(name = "course_name")
    private String courseName;
    @Column(name = "credit_points", precision = 6, scale = 1)
    private BigDecimal creditPoints;

    @NotNull
    @ManyToOne
    @JoinColumn(name="necessary_academic_rank_id")
    private AcademicRank necessaryRankId;

    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
    @Column(name = "registration_type")
    private String registrationType;

    @Min(value = 0, message = "cp.too.low")
    @Column(name = "study_level")
    private int studyLevel;

    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 90, message = "{validation.name.size.too_long}")
    })
    @Column(name = "section")
    private String section;

}
