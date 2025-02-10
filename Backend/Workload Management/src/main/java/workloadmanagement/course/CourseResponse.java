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
    private AcademicRank necessaryRankId;
    private String registrationType;
    private int studyLevel;
    private String section;
}
