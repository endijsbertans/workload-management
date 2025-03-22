package workloadmanagement.course;

import lombok.*;
import workloadmanagement.academicrank.AcademicRank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseResponse {
    private int courseId;
    private String courseCode;
    private String courseName;
    private double creditPoints;
    private String registrationType;
    private String section;
    private boolean isDeleted;
}
