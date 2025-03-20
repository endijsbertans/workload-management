package workloadmanagement.workload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import workloadmanagement.MyClass.Degree;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.MyClass.MyClassMapper;
import workloadmanagement.workload.WorkloadService.WorkloadEntities;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.stream.Collectors;

@Service
public class WorkloadMapper {
    @Autowired
    private MyClassMapper myClassMapper;
    public Workload toWorkload(
            WorkloadEntities workloadEntities,
            WorkloadRequest request
            ) {
        double programCoefficient = getProgramCoefficient(workloadEntities.groupForSemester());
        double totalCreditPoints = getTotalCreditPoints(request.groupAmount(), request.creditPointsPerGroup(), programCoefficient);
        double cpProportionOnFullTime = getCpProportionOnFullTime(workloadEntities.academicRankDetails().getCpForFullTime(), totalCreditPoints);
        double salaryPerMonth = getSalaryPerMonth(workloadEntities.academicRankDetails().getSalary(), cpProportionOnFullTime, request.industryCoefficient());
        double expectedSalary = getExpectedSalary(request.workingMonths(), request.vacationMonths(), salaryPerMonth);
        return Workload.builder()
                .teachingStaff(workloadEntities.teachingStaff())
                .semester(workloadEntities.semester())
                .comments(request.comments())
                .includeInBudget(request.includeInBudget())
                .budgetPosition(request.budgetPosition())
                .industryCoefficient(request.industryCoefficient())
                .vacationMonths(request.vacationMonths())
                .workingMonths(request.workingMonths())
                .groupAmount(request.groupAmount())
                .groupForSemester(workloadEntities.groupForSemester())
                .course(workloadEntities.course())
                .academicRankDetails(workloadEntities.academicRankDetails())
                .myClasses(workloadEntities.myClasses())
                .creditPointsPerGroup(request.creditPointsPerGroup())

                .programCoefficient(getProgramCoefficient(workloadEntities.groupForSemester()))
                .cpProportionOnFullTime(cpProportionOnFullTime)
                .salaryPerMonth(salaryPerMonth)
                .expectedSalary(expectedSalary)
                .contactHours(totalCreditPoints)
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
                .budgetPosition(workload.getBudgetPosition())
                .industryCoefficient(workload.getIndustryCoefficient())
                .programCoefficient(workload.getProgramCoefficient())
                .vacationMonths(workload.getVacationMonths())
                .expectedSalary(workload.getExpectedSalary())
                .groupAmount(workload.getGroupAmount())
                .contactHours(workload.getContactHours())
                .groupForSemester(myClassMapper.toMyClassResponse(workload.getGroupForSemester()))
                .course(workload.getCourse())
                .academicRankDetails(workload.getAcademicRankDetails())
                .creditPointsPerGroup(workload.getCreditPointsPerGroup())
                .cpProportionOnFullTime(workload.getCpProportionOnFullTime())
                .salaryPerMonth(workload.getSalaryPerMonth())

                .myClasses(workload.getMyClasses().stream()
                        .map(myClassMapper::toMyClassResponse)
                        .collect(Collectors.toList()))
                .cpForFullTime(workload.getAcademicRankDetails().getCpForFullTime())
                .monthSum(workload.getMonthSum())
                .totalCreditPoints(workload.getTotalCreditPoints())
                .build();
    }
    public WorkloadUserResponse toWorkloadUserResponse(Workload workload){
        return WorkloadUserResponse.builder()
                .workloadId(workload.getWorkloadId())
                .teachingStaff(workload.getTeachingStaff())
                .semester(workload.getSemester())
                .comments(workload.getComments())
                .groupAmount(workload.getGroupAmount())
                .contactHours(workload.getContactHours())
                .groupForSemester(myClassMapper.toMyClassResponse(workload.getGroupForSemester()))
                .course(workload.getCourse())
                .creditPointsPerGroup(workload.getCreditPointsPerGroup())
                .cpProportionOnFullTime(workload.getCpProportionOnFullTime())
                .myClasses(workload.getMyClasses().stream()
                        .map(myClassMapper::toMyClassResponse)
                        .collect(Collectors.toList()))
                .build();
    }
    private double getProgramCoefficient(MyClass groupForSemester){
        if(groupForSemester.getDegree() == Degree.MASTER){
            return 0.75;
        } else {
            return 1;
        }
    }
    public double getTotalCreditPoints(double groupAmount, double creditPointsPerGroup, double programCoefficient){
        System.out.println("getTotalCreditPoints: " + groupAmount + " * " + creditPointsPerGroup + " * " + programCoefficient + " = " + groupAmount*creditPointsPerGroup*programCoefficient);
        return round(groupAmount*creditPointsPerGroup*programCoefficient,3);
    }
    public double getSalaryPerMonth(double salary, double creditPointsOnFullTime, double industryCoefficient){
        System.out.println("getSalaryPerMonth: "+ salary + " *" + creditPointsOnFullTime + " *" + industryCoefficient + "=" + salary * creditPointsOnFullTime * industryCoefficient);
        return round(salary * creditPointsOnFullTime * industryCoefficient,3);
    }
    public double getCpProportionOnFullTime(double cpForFullTime, double totalCreditPoints){
        System.out.println("getCpProportionOnFullTime: "+totalCreditPoints + " / " +  cpForFullTime + " = "+ totalCreditPoints/cpForFullTime);
        return round(totalCreditPoints/cpForFullTime,3);
    }
    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();
        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
    private double getExpectedSalary(int wm, int vm, double salaryPerMonth) {
        return round((vm+wm)*salaryPerMonth,2);
    }

}
