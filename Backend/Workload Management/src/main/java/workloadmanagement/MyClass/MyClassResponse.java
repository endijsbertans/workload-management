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
    private String className;
    private FacultyResponse classFaculty;
    private String myClassProgram;
    private String classNameAndProgram;
}
