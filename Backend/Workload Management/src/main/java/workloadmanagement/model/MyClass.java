package workloadmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "academic_class")
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class MyClass {
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

    private String classYear;

    @ManyToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    private Collection<Workload> myWorkloads = new ArrayList<>();

}
