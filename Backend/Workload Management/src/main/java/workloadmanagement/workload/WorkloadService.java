package workloadmanagement.workload;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.MyClass.MyClassService;

import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetails;
import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetailsService;
import workloadmanagement.semester.Semester;
import workloadmanagement.semester.SemesterService;
import workloadmanagement.common.PageResponse;
import workloadmanagement.course.Course;
import workloadmanagement.course.CourseService;
import workloadmanagement.repo.IWorkloadRepo;
import workloadmanagement.teachingstaff.TeachingStaff;
import workloadmanagement.teachingstaff.TeachingStaffService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class WorkloadService {
    private final WorkloadMapper workloadMapper;
    private final IWorkloadRepo workloadRepo;
    private final TeachingStaffService teachingStaffService;
    private final SemesterService semesterService;
    private final CourseService courseService;
    private final AcademicRankDetailsService academicRankDetailsService;
    private final MyClassService myClassService;

    public Integer save(WorkloadRequest request) {
        WorkloadEntities entities = resolveEntities(request);
        double programCoefficient = getProgramCoefficient(request.program());
        double totalCreditPoints = getTotalCreditPoints(request.groupAmount(), request.creditPointsPerGroup(), programCoefficient);
        double cpProportionOnFullTime = getCpProportionOnFullTime(entities.academicRankDetails().getCpForFullTime(), totalCreditPoints);
        double salaryPerMonth = getSalaryPerMonth(entities.academicRankDetails.getSalary(), cpProportionOnFullTime, request.industryCoefficient());
        double expectedSalary = getExpectedSalary(request.workingMonths(), request.vacationMonths(), salaryPerMonth);
        Workload workload = workloadMapper.toWorkload(
                programCoefficient,
                totalCreditPoints,
                cpProportionOnFullTime,
                salaryPerMonth,
                expectedSalary,
                request,
                entities.teachingStaff,
                entities.semester,
                entities.course,
                entities.academicRankDetails,
                entities.myClasses,
                entities.groupForSemester

        );
        System.out.println("Prop: " + workload.getCpProportionOnFullTime() + " Salary: " + workload.getSalaryPerMonth() + " Total CP: " + workload.getTotalCreditPoints());
        return workloadRepo.save(workload).getWorkloadId();
    }

    private double getExpectedSalary(int wm, int vm, double salaryPerMonth) {
        return round((vm+wm)*salaryPerMonth,2);
    }

    public WorkloadResponse findById(Integer workloadId) {
        return workloadRepo.findById(workloadId)
                .map(workloadMapper::toWorkloadResponse)
                .orElseThrow(() -> new EntityNotFoundException("Workload with id: " + workloadId + " not found."));
    }

    public PageResponse<WorkloadResponse> findAllWorkloads(Pageable pageable) {
        Page<Workload> workloads = workloadRepo.findAll(pageable);
        List<WorkloadResponse> workloadResponses = workloads.stream()
                .map(workloadMapper::toWorkloadResponse)
                .toList();
        return new PageResponse<>(
                workloadResponses,
                workloads.getNumber(),
                workloads.getSize(),
                workloads.getTotalElements(),
                workloads.getTotalPages(),
                workloads.isFirst(),
                workloads.isLast()
        );
    }

    public Integer update(Integer workloadId, WorkloadRequest request) {
        Workload existingWorkload = workloadRepo.findById(workloadId)
                .orElseThrow(() -> new EntityNotFoundException("Workload with id: " + workloadId + " not found."));

        WorkloadEntities entities = resolveEntities(request);
        existingWorkload.setCreditPointsPerGroup(request.creditPointsPerGroup());
        existingWorkload.setTeachingStaff(entities.teachingStaff);
        existingWorkload.setSemester(entities.semester);
        existingWorkload.setCourse(entities.course);
        existingWorkload.setAcademicRankDetails(entities.academicRankDetails);
        existingWorkload.setMyClasses(entities.myClasses);
        existingWorkload.setGroupForSemester(entities.groupForSemester);

        existingWorkload.setComments(request.comments());
        existingWorkload.setIncludeInBudget(request.includeInBudget());
        existingWorkload.setBudgetPosition(request.budgetPosition());
        existingWorkload.setIndustryCoefficient(request.industryCoefficient());
        existingWorkload.setVacationMonths(request.vacationMonths());
        existingWorkload.setWorkingMonths(request.workingMonths());

        existingWorkload.setGroupAmount(request.groupAmount());
        existingWorkload.setContactHours(request.contactHours());
        existingWorkload.setProgram(request.program());
        double programCoefficient = getProgramCoefficient(request.program());
        existingWorkload.setProgramCoefficient(programCoefficient);
        double totalCreditPoints = getTotalCreditPoints(request.groupAmount(), request.creditPointsPerGroup(), programCoefficient);
        existingWorkload.setTotalCreditPoints(totalCreditPoints);
        double cpProportionOnFullTime = getCpProportionOnFullTime(entities.academicRankDetails().getCpForFullTime(), totalCreditPoints);
        existingWorkload.setCpProportionOnFullTime(cpProportionOnFullTime);
        double salaryPerMonth = getSalaryPerMonth(entities.academicRankDetails.getSalary(), cpProportionOnFullTime, request.industryCoefficient());
        existingWorkload.setSalaryPerMonth(salaryPerMonth);
        double expectedSalary = getExpectedSalary(request.workingMonths(), request.vacationMonths(), salaryPerMonth);
        existingWorkload.setExpectedSalary(expectedSalary);
        System.out.println("calc PROP:" + cpProportionOnFullTime);
        System.out.println("Prop: " + existingWorkload.getCpProportionOnFullTime() + " Salary: " + existingWorkload.getSalaryPerMonth() + " Total CP: " + existingWorkload.getTotalCreditPoints());
        return workloadRepo.save(existingWorkload).getWorkloadId();
    }

  // gets objects from database using their response ids
    private WorkloadEntities resolveEntities(WorkloadRequest request) {
        TeachingStaff teachingStaff = teachingStaffService.findTeachingStaffFromResponseId(request.teachingStaffId());

        Semester semester = semesterService.findSemesterFromResponseId(request.semesterId());
        Course course = courseService.findCourseFromResponseId(request.courseId());
        List<MyClass> myClasses = Arrays.stream(request.myClassIds())
                .mapToObj(myClassService::findMyClassFromResponseId)
                .collect(Collectors.toList());
        MyClass groupForSemester = myClassService.findMyClassFromResponseId(request.groupForSemesterId());
        AcademicRankDetails academicRankDetails =
                academicRankDetailsService.findAcademicRankDetailsFromResponseId(request.academicRankId(), semester);
        return new WorkloadEntities(teachingStaff, semester, course, academicRankDetails, myClasses, groupForSemester);
    }
    private double getProgramCoefficient(Boolean isMasters){
        if(isMasters){
            return 0.75;
        } else {
            return 1;
        }
    }
    public double getTotalCreditPoints(double groupAmount, double creditPointsPerGroup, double programCoefficient){
        System.out.println("getTotalCreditPoints: " + groupAmount + " * " + creditPointsPerGroup + " * " + programCoefficient + " = " + groupAmount*creditPointsPerGroup*programCoefficient);
        return round(groupAmount*creditPointsPerGroup*programCoefficient,2);
    }
    public double getSalaryPerMonth(double salary, double creditPointsOnFullTime, double industryCoefficient){
        System.out.println("getSalaryPerMonth: "+ salary + " *" + creditPointsOnFullTime + " *" + industryCoefficient + "=" + salary * creditPointsOnFullTime * industryCoefficient);
        return round(salary * creditPointsOnFullTime * industryCoefficient,2);
    }
    public double getCpProportionOnFullTime(double cpForFullTime, double totalCreditPoints){
        System.out.println("getCpProportionOnFullTime: "+totalCreditPoints + " / " +  cpForFullTime + " = "+ totalCreditPoints/cpForFullTime);
        return round(totalCreditPoints/cpForFullTime,2);
    }
    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();
        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
    private record WorkloadEntities(
            TeachingStaff teachingStaff,
            Semester semester,
            Course course,
            AcademicRankDetails academicRankDetails,
            List<MyClass> myClasses,
            MyClass groupForSemester
    ) {}
}
