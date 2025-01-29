package workloadmanagement.MyClass;

import lombok.*;
import workloadmanagement.faculty.Faculty;

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
    private Faculty classFacultyId;
    private String classYear;
}
