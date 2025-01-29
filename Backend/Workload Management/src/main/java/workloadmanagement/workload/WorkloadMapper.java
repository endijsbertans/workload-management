package workloadmanagement.workload;

import org.springframework.stereotype.Service;

@Service
public class WorkloadMapper {
    public Workload toWorkload(WorkloadRequest request) {
        return Workload.builder()
                .teachingStaff(request.teachingStaff())
                .statusTypeId(request.statusTypeId())
                .semester(request.semester())
                .comments(request.comments())
                .includeInBudget(request.includeInBudget())
                .budgetPosition(request.budgetPosition())
                .industryCoefficient(request.industryCoefficient())
                .vacationMonths(request.vacationMonths())
                .workingMonths(request.workingMonths())
                .expectedSalary(request.expectedSalary())
                .groupAmount(request.groupAmount())
                .contactHours(request.contactHours())
                .program(request.program())
                .groupForSemester(request.groupForSemester())
                .courseId(request.courseId())
                .academicRankId(request.academicRankId())
                .myClasses(request.myClasses())
                .build();
    }
    public WorkloadResponse toWorkloadResponse(Workload workload){
        return WorkloadResponse.builder()
                .workloadId(workload.getWorkloadId())
                .teachingStaff(workload.getTeachingStaff())
                .statusTypeId(workload.getStatusTypeId())
                .semester(workload.getSemester())
                .comments(workload.getComments())
                .includeInBudget(workload.getIncludeInBudget())
                .budgetPosition(workload.isBudgetPosition())
                .industryCoefficient(workload.getIndustryCoefficient())
                .vacationMonths(workload.getVacationMonths())
                .expectedSalary(workload.getExpectedSalary())
                .groupAmount(workload.getGroupAmount())
                .contactHours(workload.getContactHours())
                .program(workload.getProgram())
                .groupForSemester(workload.getGroupForSemester())
                .courseId(workload.getCourseId())
                .academicRankId(workload.getAcademicRankId())
                // Calculated values
                .academicClasses(workload.getMyClasses())
                .creditPointsPerHour(workload.getCreditPointsPerHour())
                .salaryPerMonth(workload.getSalaryPerMonth())
                .cpProportionOnFullTime(workload.getCpProportionOnFullTime())
                .build();
    }

}
