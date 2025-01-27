package workloadmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "workload")
@Getter
@Setter
@NoArgsConstructor
public class Workload {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workload_id")
    private int classId;

    @ManyToOne
    @JoinColumn(name="teaching_staff_id")
    private TeachingStaff teachingStaffid;

    @ManyToOne
    @JoinColumn(name="status_type_id")
    private StatusType statusTypeId;
    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
    @Column(name = "semester")
    private String semester;

    @Min(value = 0, message = "cp.too.low")
    @Column(name = "credit_points_per_hour" , precision = 5, scale = 3)
    private BigDecimal creditPointsPerHour;

    @Min(value = 0, message = "cp.too.low")
    @Column(name = "credit_points_per_group" , precision = 5, scale = 3)
    private BigDecimal creditPointsPerGroup;

    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 255, message = "{validation.name.size.too_long}")
    })
    @Column(name = "comments")
    private String comments;

    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
    @Column(name = "include_in_budget")
    private String includeInBudget;

    @Column(name= "budget_position")
    private boolean budgetPosition;

    @Column(name = "industry_coefficient", precision = 5, scale = 3)
    private BigDecimal industryCoefficient;

    @Min(value = 0, message = "cp.too.low")
    @Column(name = "salary_per_month", precision = 7, scale = 3)
    private BigDecimal salaryPerMonth;

    @Min(value = 0, message = "cp.too.low")
    @Column(name = "vacation_months")
    private int vacationMonths;

    @Min(value = 0, message = "cp.too.low" )
    @Column(name = "working_months")
    private int workingMonths;

    @Min(value = 0, message = "cp.too.low")
    @Column(name = "expected_salary", precision = 7, scale = 3)
    private BigDecimal expectedSalary;

    @Min(value = 0, message = "cp.too.low")
    @Column(name = "group_amount")
    private int groupAmount;

    @Min(value = 0, message = "cp.too.low")
    @Column(name = "cp_proportion_on_fulltime", precision = 6, scale = 4)
    private BigDecimal cpProportionOnFullTime;

    @Min(value = 0, message = "cp.too.low")
    @Column(name = "contact_hours", precision = 5, scale = 3)
    private BigDecimal contactHours;

    @Column(name = "program")
    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
    private String program;

    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
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
    private Collection<MyClass> academicClasses = new ArrayList<MyClass>();

    public void addAcademicClass(MyClass tClass) {
        if(!academicClasses.contains(tClass))
            academicClasses.add(tClass);
    }

    public void removeAcademicClass(MyClass tClass) {
        if(academicClasses.contains(tClass))
            academicClasses.remove(tClass);
    }
    public Workload(TeachingStaff teachingStaffid, StatusType statusTypeId, String semester, BigDecimal creditPointsPerHour, BigDecimal creditPointsPerGroup, String comments, String includeInBudget, boolean budgetPosition, BigDecimal industryCoefficient, BigDecimal salaryPerMonth, int vacationMonths, int workingMonths, BigDecimal expectedSalary, int groupAmount, BigDecimal cpProportionOnFullTime, BigDecimal contactHours, String program, String groupForSemester, Course courseId, AcademicRank academicRankId,MyClass... a){
        this.teachingStaffid = teachingStaffid;
        this.statusTypeId = statusTypeId;
        this.semester = semester;
        this.creditPointsPerHour = creditPointsPerHour;
        this.creditPointsPerGroup = creditPointsPerGroup;
        this.comments = comments;
        this.includeInBudget = includeInBudget;
        this.budgetPosition = budgetPosition;
        this.industryCoefficient = industryCoefficient;
        this.salaryPerMonth = salaryPerMonth;
        this.vacationMonths = vacationMonths;
        this.workingMonths = workingMonths;
        this.expectedSalary = expectedSalary;
        this.groupAmount = groupAmount;
        this.cpProportionOnFullTime = cpProportionOnFullTime;
        this.contactHours = contactHours;
        this.program = program;
        this.groupForSemester = groupForSemester;
        this.courseId = courseId;
        this.academicRankId = academicRankId;
        for (MyClass tempA : a)
            addAcademicClass(tempA);
    }
}
