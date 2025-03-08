package workloadmanagement.MyClass;

import lombok.*;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.faculty.FacultyResponse;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyClassResponse {
    private int classId;
    private int classLevel;
    private FacultyResponse classFaculty;
    private String myClassProgram;
    private String classLevelAndProgram;
    private Degree degree;
}
