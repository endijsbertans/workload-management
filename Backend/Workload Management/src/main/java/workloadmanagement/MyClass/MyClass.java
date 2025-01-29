package workloadmanagement.MyClass;

import jakarta.persistence.*;
import lombok.*;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.workload.Workload;

import java.util.ArrayList;
import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "_class")
public class MyClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private int classId;

    @Column(name = "class_name")
    private String className;

    @Column(name = "study_year")
    private int studyYear;

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
