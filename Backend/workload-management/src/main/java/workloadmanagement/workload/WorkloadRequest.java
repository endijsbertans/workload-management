package workloadmanagement.workload;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Arrays;

public record WorkloadRequest (
        @NotNull(message = "110")
        int teachingStaffId,

        @NotNull(message = "112")
        int semesterId,

        @Size(min = 1, message = "113")
        @Size(max = 255, message = "113")
        @NotNull(message = "113")
        @NotEmpty(message = "113")
        String comments,

        @Size(min = 1, message = "114")
        @Size(max = 45, message = "114")
        @NotNull(message = "114")
        @NotEmpty(message = "114")
        String includeInBudget,

        @NotNull(message = "115")
        BudgetPositions budgetPosition,

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
) {
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkloadRequest that = (WorkloadRequest) o;
        return teachingStaffId == that.teachingStaffId &&
                semesterId == that.semesterId &&
                Double.compare(industryCoefficient, that.industryCoefficient) == 0 &&
                vacationMonths == that.vacationMonths &&
                workingMonths == that.workingMonths &&
                groupAmount == that.groupAmount &&
                groupForSemesterId == that.groupForSemesterId &&
                courseId == that.courseId &&
                academicRankId == that.academicRankId &&
                Double.compare(creditPointsPerGroup, that.creditPointsPerGroup) == 0 &&
                comments.equals(that.comments) &&
                includeInBudget.equals(that.includeInBudget) &&
                budgetPosition == that.budgetPosition &&
                Arrays.equals(myClassIds, that.myClassIds);
    }

    @Override
    public int hashCode() {
        int result = 31 * (teachingStaffId +
                semesterId +
                comments.hashCode() +
                includeInBudget.hashCode() +
                budgetPosition.hashCode() +
                Double.hashCode(industryCoefficient) +
                vacationMonths +
                workingMonths +
                groupAmount +
                groupForSemesterId +
                courseId +
                academicRankId +
                Double.hashCode(creditPointsPerGroup));
        result = 31 * result + Arrays.hashCode(myClassIds);
        return result;
    }

    @Override
    public String toString() {
        return "WorkloadRequest[" +
                "teachingStaffId=" + teachingStaffId +
                ", semesterId=" + semesterId +
                ", comments='" + comments + '\'' +
                ", includeInBudget='" + includeInBudget + '\'' +
                ", budgetPosition=" + budgetPosition +
                ", industryCoefficient=" + industryCoefficient +
                ", vacationMonths=" + vacationMonths +
                ", workingMonths=" + workingMonths +
                ", groupAmount=" + groupAmount +
                ", groupForSemesterId=" + groupForSemesterId +
                ", courseId=" + courseId +
                ", academicRankId=" + academicRankId +
                ", myClassIds=" + Arrays.toString(myClassIds) +
                ", creditPointsPerGroup=" + creditPointsPerGroup +
                ']';
    }
}