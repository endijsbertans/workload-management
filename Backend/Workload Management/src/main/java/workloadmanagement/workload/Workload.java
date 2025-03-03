package workloadmanagement.workload;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetails;
import workloadmanagement.semester.Semester;
import workloadmanagement.course.Course;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.statustype.StatusType;
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

    private int vacationMonths;
    private int workingMonths = 5;

    private double expectedSalary;

    private int groupAmount;

    private double contactHours;

    private String program;
    @ManyToOne
    @JoinColumn(name="group_for_semester_id")
    private MyClass groupForSemester;

    @ManyToOne
    @JoinColumn(name="teaching_staff_id")
    private TeachingStaff teachingStaff;

    @ManyToOne
    @JoinColumn(name="status_type_id")
    private StatusType statusType;


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
    public double getMonthSum(){ return round(workingMonths + vacationMonths,2);}
    @Transient
    public double getCreditPointsPerHour(){
        if(contactHours > 0 && course.getCreditPoints() > 0)
            return round(course.getCreditPoints()/contactHours,2);
        else
            return 0;
    }
    @Transient
    public double getCreditPointsPerGroup(){
        if(course.getCreditPoints() > 0 && groupAmount > 0)
            return round(course.getCreditPoints()/groupAmount,2);
        else
            return 0;
    }
    @Transient
    public double getSalaryPerMonth(){
        if(academicRankDetails.getSalary() > 0 && (workingMonths+vacationMonths) > 0)
            return round(academicRankDetails.getSalary()/(workingMonths+vacationMonths),2);
        else
            return 0;
    }
    @Transient
    public double getCpProportionOnFullTime(){
        if(course.getCreditPoints() > 0 && getCpForFullTime() > 0)
            return round(course.getCreditPoints()/getCpForFullTime(),2);
        else
            return 0;
    }
    @Transient
    public double getCpForFullTime(){
            return round(academicRankDetails.getCpForFullTime(),2);
    }

    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();
        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
}
