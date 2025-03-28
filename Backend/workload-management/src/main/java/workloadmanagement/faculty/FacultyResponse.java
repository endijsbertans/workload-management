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
    private String facultyFullName;
    private boolean isDeleted;
}
