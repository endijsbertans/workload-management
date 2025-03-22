package workloadmanagement.workload;

import lombok.*;
import workloadmanagement.MyClass.MyClassResponse;
import workloadmanagement.course.Course;
import workloadmanagement.semester.Semester;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkloadUserResponse {
    private int workloadId;
    private TeachingStaff teachingStaff;
    private Semester semester;
    private String comments;
    private int groupAmount;
    private double contactHours;
    private MyClassResponse groupForSemester;
    private Course course;
    private List<MyClassResponse> myClasses;
    private double creditPointsPerGroup;
    private double cpProportionOnFullTime;
}
