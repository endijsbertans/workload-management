package workloadmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "academic_class")
@Getter
@Setter
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
    @JoinTable(name = "workload_clases",
            joinColumns = @JoinColumn(name= "class_id"),
            inverseJoinColumns = @JoinColumn(name = "workload_id"))
    @ToString.Exclude
    private Collection<Workload> myWorkloads = new ArrayList<>();
    public MyClass(String className, int studyYear, int studentAmount, Faculty classFacultyId, String classYear){
        this.className = className;
        this.studyYear = studyYear;
        this.studentAmount = studentAmount;
        this.classFacultyId = classFacultyId;
        this.classYear = classYear;
    }
    public void addWorkload(Workload Tworkload) {
        if (!myWorkloads.contains(Tworkload))
            myWorkloads.add(Tworkload);
    }

    public void removeWorkload(Workload Tworkload) {
        if (myWorkloads.contains(Tworkload))
            myWorkloads.remove(Tworkload);
    }
}
