package workloadmanagement.workload;

import jakarta.persistence.EntityNotFoundException;
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
import workloadmanagement.statustype.StatusType;
import workloadmanagement.statustype.StatusTypeService;
import workloadmanagement.teachingstaff.TeachingStaff;
import workloadmanagement.teachingstaff.TeachingStaffService;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class WorkloadService {
    private final WorkloadMapper workloadMapper;
    private final IWorkloadRepo workloadRepo;
    private final TeachingStaffService teachingStaffService;
    private final StatusTypeService statusTypeService;
    private final SemesterService semesterService;
    private final CourseService courseService;
    private final AcademicRankDetailsService academicRankDetailsService;
    private final MyClassService myClassService;

    public Integer save(WorkloadRequest request) {
        WorkloadEntities entities = resolveEntities(request);
        Workload workload = workloadMapper.toWorkload(
                request,
                entities.teachingStaff,
                entities.statusType,
                entities.semester,
                entities.course,
                entities.academicRankDetails,
                entities.myClasses,
                entities.groupForSemester
        );
        return workloadRepo.save(workload).getWorkloadId();
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

        existingWorkload.setTeachingStaff(entities.teachingStaff);
        existingWorkload.setStatusType(entities.statusType);
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
        existingWorkload.setExpectedSalary(request.expectedSalary());
        existingWorkload.setGroupAmount(request.groupAmount());
        existingWorkload.setContactHours(request.contactHours());
        existingWorkload.setProgram(request.program());

        return workloadRepo.save(existingWorkload).getWorkloadId();
    }

  // gets objects from database using their response ids
    private WorkloadEntities resolveEntities(WorkloadRequest request) {
        TeachingStaff teachingStaff = teachingStaffService.findTeachingStaffFromResponseId(request.teachingStaffId());
        StatusType statusType = statusTypeService.findStatusTypeFromResponseId(request.statusTypeId());
        Semester semester = semesterService.findSemesterFromResponseId(request.semesterId());
        Course course = courseService.findCourseFromResponseId(request.courseId());
        List<MyClass> myClasses = Arrays.stream(request.myClassIds())
                .mapToObj(myClassService::findMyClassFromResponseId)
                .collect(Collectors.toList());
        MyClass groupForSemester = myClassService.findMyClassFromResponseId(request.groupForSemesterId());
        AcademicRankDetails academicRankDetails =
                academicRankDetailsService.findAcademicRankDetailsFromResponseId(request.academicRankId(), semester);
        return new WorkloadEntities(teachingStaff, statusType, semester, course, academicRankDetails, myClasses, groupForSemester);
    }

    private record WorkloadEntities(
            TeachingStaff teachingStaff,
            StatusType statusType,
            Semester semester,
            Course course,
            AcademicRankDetails academicRankDetails,
            List<MyClass> myClasses,
            MyClass groupForSemester
    ) {}
}
