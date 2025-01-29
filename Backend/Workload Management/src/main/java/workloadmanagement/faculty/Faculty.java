package workloadmanagement.faculty;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "faculty")
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "faculty_id")
    private int facultyId;

    @Column(name = "faculty_name")
    private String facultyName;

    @Column(name = "faculty_full_name")
    private String faculty_full_name;

}
