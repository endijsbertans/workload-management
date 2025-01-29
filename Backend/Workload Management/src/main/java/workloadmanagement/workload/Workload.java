package workloadmanagement.workload;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.course.Course;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "workload")
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Workload {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workload_id")
    private int workloadId;

    @ManyToOne
    @JoinColumn(name="teaching_staff_id")
    private TeachingStaff teachingStaff;

    @ManyToOne
    @JoinColumn(name="status_type_id")
    private StatusType statusTypeId;

    @Column(name = "semester")
    private String semester;

    @Column(name = "comments")
    private String comments;

    @Column(name = "include_in_budget")
    private String includeInBudget;

    @Column(name= "budget_position")
    private boolean budgetPosition;

    @Column(name = "industry_coefficient")
    private double industryCoefficient;

    @Column(name = "vacation_months")
    private int vacationMonths;

    @Column(name = "working_months")
    private int workingMonths;

    @Column(name = "expected_salary")
    private double expectedSalary;

    @Column(name = "group_amount")
    private int groupAmount;

    @Column(name = "contact_hours")
    private double contactHours;

    @Column(name = "program")
    private String program;

    @Column(name = "group_for_semester")
    private String groupForSemester;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course courseId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "academic_rank_id")
    private AcademicRank academicRankId;

    @ManyToMany(mappedBy = "myWorkloads", fetch = FetchType.EAGER)
    private Collection<MyClass> myClasses = new ArrayList<MyClass>();

    @Transient
    public double getCreditPointsPerHour(){
        return courseId.getCreditPoints()/contactHours;
    }
    @Transient
    public double getCreditPointsPerGroup(){
        return courseId.getCreditPoints()/groupAmount;
    }
    @Transient
    public double getSalaryPerMonth(){
        return teachingStaff.getStaffAcademicRankId().getSalary()/workingMonths+vacationMonths;
    }
    @Transient
    public double getCpProportionOnFullTime(){
        if(semester.contains("spring"))
            return teachingStaff.getStaffAcademicRankId().getCpForSpring()/courseId.getCreditPoints();
        else
            return teachingStaff.getStaffAcademicRankId().getCpForAutumn()/courseId.getCreditPoints();
    }
}
