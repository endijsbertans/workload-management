package workloadmanagement.myclass;

import lombok.*;
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
    private String classProgram;
    private String classLevelAndProgram;
    private Degree degree;
    private boolean isDeleted;
}
