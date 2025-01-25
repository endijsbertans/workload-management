package workloadmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "class")
@Getter
@Setter
@NoArgsConstructor
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private int classId;
    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
    @Column(name = "class_name")
    private String className;

    @Min(0)
    @Column(name = "study_year")
    private int studyYear;

    @Min(0)
    @Column(name = "student_amount")
    private int studentAmount;

    @ManyToOne
    @JoinColumn(name="class_faculty_id")
    private Faculty classFacultyId;
}
