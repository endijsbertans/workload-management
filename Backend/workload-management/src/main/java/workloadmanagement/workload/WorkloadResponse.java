package workloadmanagement.workload;

import lombok.*;
import workloadmanagement.myclass.MyClassResponse;
import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetails;
import workloadmanagement.semester.Semester;
import workloadmanagement.course.Course;
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

    private Semester semester;
    private String comments;
    private String includeInBudget;
    private BudgetPositions budgetPosition;
    private double industryCoefficient;
    private double programCoefficient;
    private int vacationMonths;
//    private int workingMonths;
    private double expectedSalary;
    private int groupAmount;
    private double contactHours;
    private MyClassResponse groupForSemester;
    private Course course;
    private AcademicRankDetails academicRankDetails;
    private List<MyClassResponse> myClasses;
    private double creditPointsPerGroup;
    private double totalCreditPoints;
    private double cpProportionOnFullTime;
    // Calculated values
    private double salaryPerMonth;
    private double cpForFullTime;
    private double monthSum;

}
