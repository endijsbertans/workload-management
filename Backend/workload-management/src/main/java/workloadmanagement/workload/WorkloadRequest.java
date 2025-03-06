package workloadmanagement.workload;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record WorkloadRequest (
    @NotNull(message = "110")
    int teachingStaffId,

    @NotNull(message = "112")
    int semesterId,

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
    boolean budgetPosition,

    @NotNull(message = "116")
    double industryCoefficient,

    @Min(value = 0, message = "117")
    @NotNull(message = "117")
    int vacationMonths,

    @Min(value = 0, message = "118" )
    int workingMonths,

    @Min(value = 0, message = "120")
    @NotNull(message = "120")
    int groupAmount,

    @Min(value = 0, message = "121")
    @NotNull(message = "121")
    double contactHours,

    @NotNull(message = "122")
    boolean program,
    @NotNull(message = "123")
    int groupForSemesterId,

    @NotNull(message = "124")
    int courseId,

    @NotNull(message = "124")
    int academicRankId,

    @NotNull(message = "125")
    int[] myClassIds,

    @Min(value = 0, message = "126")
    @NotNull(message = "126")
    double creditPointsPerGroup

){
}
