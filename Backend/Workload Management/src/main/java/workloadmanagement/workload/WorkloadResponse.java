package workloadmanagement.workload;

import lombok.*;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.course.Course;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkloadResponse {
    private int workloadId;
    private TeachingStaff teachingStaff;
    private StatusType statusType;
    private String semester;
    private String comments;
    private String includeInBudget;
    private boolean budgetPosition;
    private double industryCoefficient;
    private int vacationMonths;
//    private int workingMonths;
    private double expectedSalary;
    private int groupAmount;
    private double contactHours;
    private String program;
    private String groupForSemester;
    private Course course;
    private AcademicRank academicRank;
    private List<MyClass> myClasses;

    // Calculated values
    private double creditPointsPerHour;
    private double creditPointsPerGroup;
    private double salaryPerMonth;
    private double cpProportionOnFullTime;
    private double cpForFullTime;
    private double monthSum;
}
