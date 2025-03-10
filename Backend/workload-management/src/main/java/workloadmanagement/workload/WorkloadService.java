package workloadmanagement.workload;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Path;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import workloadmanagement.MyClass.Degree;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
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
        Workload workload = workloadMapper.toWorkload(entities, request);
        return workloadRepo.save(workload).getWorkloadId();
    }
    public WorkloadResponse findById(Integer workloadId) {
        return workloadRepo.findById(workloadId)
                .map(workloadMapper::toWorkloadResponse)
                .orElseThrow(() -> new EntityNotFoundException("Workload with id: " + workloadId + " not found."));
    }

public PageResponse<WorkloadResponse> findAllWorkloads(Pageable pageable, Map<String, FilterCriteria> filters) {
    Page<Workload> workloads;
    if (filters != null && !filters.isEmpty()) {
        workloads = findFilteredWorkloads(pageable, filters);
    } else {
        workloads = workloadRepo.findAll(pageable);
    }
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

    private Page<Workload> findFilteredWorkloads(Pageable pageable, Map<String, FilterCriteria> filters) {
        return workloadRepo.findAll((root, query, criteriaBuilder) -> {
            List<jakarta.persistence.criteria.Predicate> predicates = new ArrayList<>();

            filters.forEach((column, filter) -> {
                // Special handling for MyClass filtering (many-to-many relationship)
                if (column.startsWith("class")) {
                    jakarta.persistence.criteria.Join<Workload, MyClass> classJoin = root.join("myClasses", JoinType.LEFT);
                    System.out.println(classJoin);
                    addPredicate(predicates, criteriaBuilder, classJoin.get(column), filter);
                }
                // Handle other nested properties like "teachingStaff.name"
                else if (column.contains(".")) {
                    String[] parts = column.split("\\.");
                    jakarta.persistence.criteria.Join<?, ?> join = null;

                    for (int i = 0; i < parts.length - 1; i++) {
                        if (join == null) {
                            join = root.join(parts[i], JoinType.LEFT);
                        } else {
                            join = join.join(parts[i], JoinType.LEFT);
                        }
                    }

                    String lastPart = parts[parts.length - 1];
                    addPredicate(predicates, criteriaBuilder, join.get(lastPart), filter);
                } else {
                    // Handle simple properties
                    try {
                        addPredicate(predicates, criteriaBuilder, root.get(column), filter);
                    } catch (Exception e) {
                        // Skip columns that can't be cast or don't exist
                    }
                }
            });

            return predicates.isEmpty() ? criteriaBuilder.conjunction() :
                    criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        }, pageable);
    }

    private void addPredicate(List<jakarta.persistence.criteria.Predicate> predicates,
                              CriteriaBuilder criteriaBuilder,
                              Path<Object> path,
                              FilterCriteria filter) {
        String operator = filter.getOperator() != null ? filter.getOperator() : "contains";
        String value = filter.getValue();
        if (value == null || value.isEmpty()) {
            return;
        }
        try {
            switch (operator) {
                case "contains":
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(path.as(String.class)),
                            "%" + value.toLowerCase() + "%"));
                    break;
                case "equals":
                    predicates.add(criteriaBuilder.equal(
                            criteriaBuilder.lower(path.as(String.class)),
                            value.toLowerCase()));
                    break;
                case "startsWith":
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(path.as(String.class)),
                            value.toLowerCase() + "%"));
                    break;
                case "endsWith":
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(path.as(String.class)),
                            "%" + value.toLowerCase()));
                    break;
            }
        } catch (Exception e) {

        }
    }
    public Integer update(Integer workloadId, WorkloadRequest request) {
        Workload existingWorkload = workloadRepo.findById(workloadId)
                .orElseThrow(() -> new EntityNotFoundException("Workload with id: " + workloadId + " not found."));
        WorkloadEntities wEntities = resolveEntities(request);

        Workload updatedWorkload = workloadMapper.toWorkload(wEntities, request);
        updatedWorkload.setWorkloadId(existingWorkload.getWorkloadId());

        return workloadRepo.save(updatedWorkload).getWorkloadId();
    }

  // gets objects from database using their response ids
    private WorkloadEntities resolveEntities(WorkloadRequest request) {
        TeachingStaff teachingStaff = teachingStaffService.findTeachingStaffFromResponseId(request.teachingStaffId());

        Semester semester = semesterService.findSemesterFromResponseId(request.semesterId());
        Course course = courseService.findCourseFromResponseId(request.courseId());
        List<MyClass> myClasses = Arrays.stream(request.myClassIds())
                .mapToObj(myClassService::findMyClassFromResponseId)
                .toList();
        MyClass groupForSemester = myClassService.findMyClassFromResponseId(request.groupForSemesterId());
        AcademicRankDetails academicRankDetails =
                academicRankDetailsService.findAcademicRankDetailsFromResponseId(request.academicRankId(), semester);
        return new WorkloadEntities(teachingStaff, semester, course, academicRankDetails, myClasses, groupForSemester);
    }

    public record WorkloadEntities(
            TeachingStaff teachingStaff,
            Semester semester,
            Course course,
            AcademicRankDetails academicRankDetails,
            List<MyClass> myClasses,
            MyClass groupForSemester
    ) {}
}
