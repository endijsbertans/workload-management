package workloadmanagement.MyClass;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.workload.Workload;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@ToString
public class MyClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int classId;

    private String className;

    private String classYear;

    private int studentAmount;

    @ManyToOne
    @JoinColumn(name="class_faculty_id")
    private Faculty classFaculty;


    @ManyToMany(mappedBy = "myClasses")
    @JsonIgnore
    private List<Workload> myWorkloads = new ArrayList<>();


}
