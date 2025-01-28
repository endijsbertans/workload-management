package workloadmanagement.model;

import jakarta.persistence.*;

import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "Faculty")
@Getter
@Setter
@AllArgsConstructor
@Builder
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

}
