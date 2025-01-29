package workloadmanagement.faculty;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FacultyResponse {
    private int facultyId;
    private String facultyName;
    private String faculty_full_name;
}
