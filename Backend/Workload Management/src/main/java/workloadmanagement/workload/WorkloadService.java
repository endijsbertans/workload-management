package workloadmanagement.workload;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.MyClass.MyClassService;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.AcademicRankService;
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

import java.util.ArrayList;
import java.util.List;


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
        TeachingStaff teachingStaff = teachingStaffService.findTeachingStaffFromResponseId(request.teachingStaffId());
        StatusType statusType = statusTypeService.findStatusTypeFromResponseId(request.statusTypeId());
        Semester semester = semesterService.findSemesterFromResponseId(request.semesterId());
        Course course = courseService.findCourseFromResponseId(request.courseId());
        List<MyClass> myClasses = new ArrayList<>();
        MyClass groupForSemester = myClassService.findMyClassFromResponseId(request.groupForSemesterId());
        for(int id : request.myClassIds()){
            myClasses.add(myClassService.findMyClassFromResponseId(id));
        }
        AcademicRankDetails academicRankDetails = academicRankDetailsService.findAcademicRankDetailsFromResponseId(request.academicRankId(), semester);
        Workload workload = workloadMapper.toWorkload(
                request,
                teachingStaff,
                statusType,
                semester,
                course,
                academicRankDetails,
                myClasses,
                groupForSemester
        );
        return workloadRepo.save(workload).getWorkloadId();
    }
    public WorkloadResponse findById(Integer tstaffId) {
        return workloadRepo.findById(tstaffId)
                .map(workloadMapper::toWorkloadResponse)
                .orElseThrow(() -> new EntityNotFoundException("Teaching staff with id: " + tstaffId + " not found."));
    }
    public PageResponse<WorkloadResponse> findAllWorkloads(Pageable pageable) {
//        Workload workload = new Workload();
//        workload.getTeachingStaff()
       // Pageable pageable = PageRequest.of(page, size, Sort.by("teachingStaff.name").descending());
        Page<Workload> workloads = workloadRepo.findAll(pageable);  // Pass pageable here
        List<WorkloadResponse> workloadResponse = workloads.stream()
                .map(workloadMapper::toWorkloadResponse)
                .toList();
        System.out.println(pageable);
        System.out.println(workloads);

        return new PageResponse<>(
                workloadResponse,
                workloads.getNumber(),
                workloads.getSize(),
                workloads.getTotalElements(),
                workloads.getTotalPages(),
                workloads.isFirst(),
                workloads.isLast()
        );
    }
}