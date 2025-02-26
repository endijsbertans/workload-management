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
            WorkloadRequest request,
            TeachingStaff teachingStaff,
            StatusType statusType,
            Semester semester,
            Course course,
            AcademicRankDetails academicRankDetails,
            List<MyClass> myClasses,
            MyClass classForSemester) {
        return Workload.builder()
                .teachingStaff(teachingStaff)
                .statusType(statusType)
                .semester(semester)
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
                .groupForSemester(classForSemester)
                .course(course)
                .academicRankDetails(academicRankDetails)
                .myClasses(myClasses)
                .build();
    }
    public WorkloadResponse toWorkloadResponse(Workload workload){
        return WorkloadResponse.builder()
                .workloadId(workload.getWorkloadId())
                .teachingStaff(workload.getTeachingStaff())
                .statusType(workload.getStatusType())
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
                .groupForSemester(myClassMapper.toMyClassResponse(workload.getGroupForSemester()))
                .course(workload.getCourse())
                .academicRankDetails(workload.getAcademicRankDetails())
                // Calculated values
                .myClasses(workload.getMyClasses())
                .creditPointsPerHour(workload.getCreditPointsPerHour())
                .creditPointsPerGroup(workload.getCreditPointsPerGroup())
                .salaryPerMonth(workload.getSalaryPerMonth())
                .cpProportionOnFullTime(workload.getCpProportionOnFullTime())
                .cpForFullTime(workload.getCpForFullTime())
                .monthSum(workload.getMonthSum())
                .build();
    }

}
