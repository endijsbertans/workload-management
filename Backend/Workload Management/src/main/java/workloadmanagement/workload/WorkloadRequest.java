package workloadmanagement.workload;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.course.Course;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.List;

public record WorkloadRequest (
    @NotNull(message = "110")
    @NotEmpty(message = "110")
    TeachingStaff teachingStaff,

    @NotNull(message = "111")
    @NotEmpty(message = "111")
    StatusType statusType,

    @Size.List({
            @Size(min = 1, message = "112"),
            @Size(max = 45, message = "112")
    })
    @NotNull(message = "112")
    @NotEmpty(message = "112")
    String semester,

    @Size.List({
            @Size(min = 1, message = "113"),
            @Size(max = 255, message = "113")
    })
    @NotNull(message = "113")
    @NotEmpty(message = "113")
    String comments,

    @Size.List({
            @Size(min = 1, message = "114"),
            @Size(max = 45, message = "114")
    })
    @NotNull(message = "114")
    @NotEmpty(message = "114")
    String includeInBudget,

    @NotNull(message = "115")
    @NotEmpty(message = "115")
    boolean budgetPosition,

    @NotNull(message = "116")
    @NotEmpty(message = "116")
    double industryCoefficient,

    @Min(value = 0, message = "117")
    @NotNull(message = "117")
    @NotEmpty(message = "117")
    int vacationMonths,

    @Min(value = 0, message = "118" )
    @NotNull(message = "118")
    @NotEmpty(message = "118")
    int workingMonths,

    @Min(value = 0, message = "119")
    @NotNull(message = "119")
    @NotEmpty(message = "119")
    double expectedSalary,

    @Min(value = 0, message = "120")
    @NotNull(message = "120")
    @NotEmpty(message = "120")
    int groupAmount,

    @Min(value = 0, message = "121")
    @NotNull(message = "121")
    @NotEmpty(message = "121")
    double contactHours,

    @Size.List({
            @Size(min = 1, message = "122"),
            @Size(max = 45, message = "122")
    })
    @NotNull(message = "122")
    @NotEmpty(message = "122")
    String program,
    @Size.List({
            @Size(min = 1, message = "123"),
            @Size(max = 45, message = "123")
    })
    @NotNull(message = "123")
    @NotEmpty(message = "123")
    String groupForSemester,

    @NotNull(message = "124")
    @NotEmpty(message = "124")
    Course course,

    @NotNull(message = "124")
    @NotEmpty(message = "124")
    AcademicRank academicRank,

    @NotNull(message = "125")
    @NotEmpty(message = "125")
    List<MyClass> myClasses

){}
