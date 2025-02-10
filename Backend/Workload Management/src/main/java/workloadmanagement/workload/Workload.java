package workloadmanagement.workload;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.course.Course;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.teachingstaff.TeachingStaff;

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

    private String semester;

    private String comments;

    private String includeInBudget;

    private boolean budgetPosition;

    private double industryCoefficient;

    private int vacationMonths;
    private int workingMonths = 5;

    private double expectedSalary;

    private int groupAmount;

    private double contactHours;

    private String program;

    private String groupForSemester;

    @ManyToOne
    @JoinColumn(name="teaching_staff_id")
    private TeachingStaff teachingStaff;

    @ManyToOne
    @JoinColumn(name="status_type_id")
    private StatusType statusType;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "academic_rank_id")
    private AcademicRank academicRank;

    @ManyToMany(fetch = EAGER)
    private List<MyClass> myClasses = new ArrayList<>();

//    public String getMyClasses(){
//        return myClasses.stream().map(MyClass::getClassName).collect(Collectors.joining(", "));
//    }

    @Transient
    public double getMonthSum(){ return workingMonths + vacationMonths;}
    @Transient
    public double getCreditPointsPerHour(){
        return course.getCreditPoints()/contactHours;
    }
    @Transient
    public double getCreditPointsPerGroup(){
        return course.getCreditPoints()/groupAmount;
    }
    @Transient
    public double getSalaryPerMonth(){
        return teachingStaff.getStaffAcademicRank().getSalary()/workingMonths+vacationMonths;
    }
    @Transient
    public double getCpProportionOnFullTime(){
        return course.getCreditPoints()/getCpForFullTime();
    }
    public double getCpForFullTime(){
        if(semester.contains("pavasaris"))
            return teachingStaff.getStaffAcademicRank().getCpForSpring()/course.getCreditPoints();
        else
            return teachingStaff.getStaffAcademicRank().getCpForAutumn()/course.getCreditPoints();
    }
}
