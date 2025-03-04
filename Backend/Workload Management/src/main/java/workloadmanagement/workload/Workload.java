package workloadmanagement.workload;

import jakarta.persistence.*;
import lombok.*;
import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetails;
import workloadmanagement.semester.Semester;
import workloadmanagement.course.Course;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.EAGER;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@ToString
public class Workload {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int workloadId;
    @ManyToOne
    @JoinColumn(name="semester_id")
    private Semester semester;
    private String comments;
    private String includeInBudget;
    private boolean budgetPosition;
    private double industryCoefficient;
    private double programCoefficient;
    private int vacationMonths;
    private int workingMonths = 5;
    private double expectedSalary;
    private int groupAmount;
    private double contactHours;
    private boolean program;

    private double creditPointsPerGroup;

    //creditPointsXgroupAmountXprogramCoefficient
    private double totalCreditPoints;
    private double cpProportionOnFullTime;
    private double salaryPerMonth;

    @ManyToOne
    @JoinColumn(name="group_for_semester_id")
    private MyClass groupForSemester;

    @ManyToOne
    @JoinColumn(name="teaching_staff_id")
    private TeachingStaff teachingStaff;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "academic_rank_details_id")
    private AcademicRankDetails academicRankDetails;

    @ManyToMany(fetch = EAGER)
    private List<MyClass> myClasses = new ArrayList<>();

//    public String getMyClasses(){
//        return myClasses.stream().map(MyClass::getClassName).collect(Collectors.joining(", "));
//    }
    @Transient
    public double getMonthSum(){ return workingMonths + vacationMonths;}
}
