package workloadmanagement.workload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.MyClass.MyClassMapper;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetails;
import workloadmanagement.semester.Semester;
import workloadmanagement.course.Course;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.List;

@Service
public class WorkloadMapper {
    @Autowired
    private MyClassMapper myClassMapper;
    public Workload toWorkload(
            double programCoefficient,
            double totalCreditPoints,
            double cpProportionOnFullTime,
            double salaryPerMonth,
            double expectedSalary,
            WorkloadRequest request,
            TeachingStaff teachingStaff,
            Semester semester,
            Course course,
            AcademicRankDetails academicRankDetails,
            List<MyClass> myClasses,
            MyClass classForSemester
            ) {
        return Workload.builder()
                .programCoefficient(programCoefficient)
                .teachingStaff(teachingStaff)
                .cpProportionOnFullTime(cpProportionOnFullTime)
                .salaryPerMonth(salaryPerMonth)
                .semester(semester)
                .comments(request.comments())
                .includeInBudget(request.includeInBudget())
                .budgetPosition(request.budgetPosition())
                .industryCoefficient(request.industryCoefficient())
                .vacationMonths(request.vacationMonths())
                .workingMonths(request.workingMonths())
                .expectedSalary(expectedSalary)
                .groupAmount(request.groupAmount())
                .contactHours(request.contactHours())
                .program(request.program())
                .groupForSemester(classForSemester)
                .course(course)
                .academicRankDetails(academicRankDetails)
                .myClasses(myClasses)
                .creditPointsPerGroup(request.creditPointsPerGroup())
                .totalCreditPoints(totalCreditPoints)
                .build();
    }
    public WorkloadResponse toWorkloadResponse(Workload workload){
        return WorkloadResponse.builder()
                .workloadId(workload.getWorkloadId())
                .teachingStaff(workload.getTeachingStaff())
                .semester(workload.getSemester())
                .comments(workload.getComments())
                .includeInBudget(workload.getIncludeInBudget())
                .budgetPosition(workload.isBudgetPosition())
                .industryCoefficient(workload.getIndustryCoefficient())
                .programCoefficient(workload.getProgramCoefficient())
                .vacationMonths(workload.getVacationMonths())
                .expectedSalary(workload.getExpectedSalary())
                .groupAmount(workload.getGroupAmount())
                .contactHours(workload.getContactHours())
                .program(workload.isProgram())
                .groupForSemester(myClassMapper.toMyClassResponse(workload.getGroupForSemester()))
                .course(workload.getCourse())
                .academicRankDetails(workload.getAcademicRankDetails())
                .creditPointsPerGroup(workload.getCreditPointsPerGroup())
                .cpProportionOnFullTime(workload.getCpProportionOnFullTime())
                .salaryPerMonth(workload.getSalaryPerMonth())
                // Calculated values
                .myClasses(workload.getMyClasses())

                .cpForFullTime(workload.getAcademicRankDetails().getCpForFullTime())
                .monthSum(workload.getMonthSum())
                .totalCreditPoints(workload.getTotalCreditPoints())
                .build();
    }

}
