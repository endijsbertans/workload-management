package workloadmanagement.model;

import jakarta.persistence.*;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Faculty")
@Getter
@Setter
@NoArgsConstructor
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "faculty_id")
    private int facultyId;

    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 10, message = "{validation.name.size.too_long}")
    })
    @Column(name = "faculty_name")
    private String facultyName;

    @Column(name = "faculty_full_name")
    @Size.List({
            @Size(min = 5, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
    private String faculty_full_name;

    public Faculty(String facultyName, String faculty_full_name) {
        this.facultyName = facultyName;
        this.faculty_full_name = faculty_full_name;
    }
}
