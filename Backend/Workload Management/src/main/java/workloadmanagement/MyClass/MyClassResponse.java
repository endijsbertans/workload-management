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
    private int studyYear;
    private int studentAmount;
    private FacultyResponse classFaculty;
    private String classYear;
    private String classNameAndYear;
}
