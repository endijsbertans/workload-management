package workloadmanagement.workload;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Path;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import workloadmanagement.auth.security.user.MyUser;
import workloadmanagement.myclass.MyClass;
import workloadmanagement.myclass.MyClassService;

import workloadmanagement.academicrank.academicrankdetails.AcademicRankDetails;
import workloadmanagement.academicrank.academicrankdetails.AcademicRankDetailsService;

import workloadmanagement.teachingstaff.ITeachingStaffRepo;
import workloadmanagement.semester.Semester;
import workloadmanagement.semester.SemesterService;
import workloadmanagement.common.PageResponse;
import workloadmanagement.course.Course;
import workloadmanagement.course.CourseService;
import workloadmanagement.teachingstaff.TeachingStaff;
import workloadmanagement.teachingstaff.TeachingStaffService;

import java.util.*;


@Service
@RequiredArgsConstructor
public class WorkloadService {
    private final WorkloadMapper workloadMapper;
    private final IWorkloadRepo workloadRepo;
    private final TeachingStaffService teachingStaffService;
    private final ITeachingStaffRepo teachingStaffRepo;
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
        return workloadRepo.findAll((root, query, criteriaBuilder) ->
                        buildFilterPredicate(filters, root, criteriaBuilder, new ArrayList<>()),
                pageable);
    }

    private Page<Workload> findFilteredUserWorkloads(Pageable pageable, Map<String, FilterCriteria> filters, TeachingStaff staff) {
        return workloadRepo.findAll((root, query, criteriaBuilder) -> {
            List<jakarta.persistence.criteria.Predicate> predicates = new ArrayList<>();

            //  user filter
            predicates.add(criteriaBuilder.equal(root.get("teachingStaff"), staff));

            // additional filters
            return buildFilterPredicate(filters, root, criteriaBuilder, predicates);
        }, pageable);
    }

    private jakarta.persistence.criteria.Predicate buildFilterPredicate(
            Map<String, FilterCriteria> filters,
            jakarta.persistence.criteria.Root<Workload> root,
            CriteriaBuilder criteriaBuilder,
            List<jakarta.persistence.criteria.Predicate> predicates) {

        if (filters != null && !filters.isEmpty()) {
            applyFilters(filters, root, criteriaBuilder, predicates);
        }

        return predicates.isEmpty() ? criteriaBuilder.conjunction() :
                criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
    }

    private void applyFilters(
            Map<String, FilterCriteria> filters,
            jakarta.persistence.criteria.Root<Workload> root,
            CriteriaBuilder criteriaBuilder,
            List<jakarta.persistence.criteria.Predicate> predicates) {

        filters.forEach((column, filter) -> {
            // Special handling for MyClass filtering (many-to-many relationship)
            if (column.startsWith("class")) {
                jakarta.persistence.criteria.Join<Workload, MyClass> classJoin = root.join("myClasses", JoinType.LEFT);
                try {
                    addPredicate(predicates, criteriaBuilder, classJoin.get(column), filter);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
            // Handle other nested properties like "teachingStaff.name"
            else if (column.contains(".")) {
                try {
                    applyNestedFilter(column, filter, root, criteriaBuilder, predicates);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            } else {
                // Handle simple properties
                try {
                    addPredicate(predicates, criteriaBuilder, root.get(column), filter);
                } catch (Exception e) {
                    // Skip columns that can't be cast or don't exist
                }
            }
        });
    }

    private void applyNestedFilter(
    String column,
    FilterCriteria filter,
    jakarta.persistence.criteria.Root<Workload> root,
    CriteriaBuilder criteriaBuilder,
    List<jakarta.persistence.criteria.Predicate> predicates) throws Exception {

        String[] parts = column.split("\\.");
        jakarta.persistence.criteria.Join<?, ?> join = null;

        for (int i = 0; i < parts.length - 1; i++) {
            if (join == null) {
                join = root.join(parts[i], JoinType.LEFT);
            } else {
                join = join.join(parts[i], JoinType.LEFT);
            }
        }
        if (join == null) {
            throw new IllegalStateException("Failed to create a join for column: " + column);
        }
        String lastPart = parts[parts.length - 1];
        addPredicate(predicates, criteriaBuilder, join.get(lastPart), filter);
    }

    private void addPredicate(List<jakarta.persistence.criteria.Predicate> predicates,
                              CriteriaBuilder criteriaBuilder,
                              Path<Object> path,
                              FilterCriteria filter) throws Exception {
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
                default:
                    throw new IllegalArgumentException("Unsupported operator: " + operator);
            }
        } catch (Exception e) {
            throw new Exception("Error creating predicate for operator: " + operator, e);
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
    public Integer delete(Integer workloadId) {
        Workload existingWorkload = workloadRepo.findById(workloadId)
                .orElseThrow(() -> new EntityNotFoundException("Workload with id: " + workloadId + " not found."));
        workloadRepo.delete(existingWorkload);
        return workloadId;
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

    public PageResponse<?> findAllUserWorkloads(Pageable pageable, Map<String, FilterCriteria> filters, MyUser user) {
        // Get the teaching staff associated with this user
        TeachingStaff staff = teachingStaffRepo.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("No teaching staff found for user: " + user.getEmail()));

        // Apply both user filter and additional filters
        Page<Workload> workloads;
        if (filters != null && !filters.isEmpty()) {
            workloads = findFilteredUserWorkloads(pageable, filters, staff);
        } else {
            workloads = workloadRepo.findByTeachingStaff(staff, pageable);
        }

        // Format the response based on user role
        boolean isAdmin = user.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().contains("ADMIN"));

        List<?> workloadResponses = workloads.stream()
                .map(workload -> isAdmin ?
                        workloadMapper.toWorkloadResponse(workload) :
                        workloadMapper.toWorkloadUserResponse(workload))
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


    public record WorkloadEntities(
            TeachingStaff teachingStaff,
            Semester semester,
            Course course,
            AcademicRankDetails academicRankDetails,
            List<MyClass> myClasses,
            MyClass groupForSemester
    ) {}


    public int copyWorkloadsFromSemester(Semester sourceSemester, Semester newSemester) {
        List<Workload> sourceWorkloads = workloadRepo.findBySemester(sourceSemester);
        List<Workload> newWorkloads = new ArrayList<>();

        for (Workload source : sourceWorkloads) {

            WorkloadRequest request = createWorkloadRequestFromSource(source, newSemester.getSemesterId());

            WorkloadEntities entities = resolveEntities(request);
            Workload newWorkload = workloadMapper.toWorkload(entities, request);

            newWorkloads.add(newWorkload);
        }

        if (!newWorkloads.isEmpty()) {
            workloadRepo.saveAll(newWorkloads);
        }

        return newWorkloads.size();
    }
    private WorkloadRequest createWorkloadRequestFromSource(Workload source, Integer newSemesterId) {
        return new WorkloadRequest(
                source.getTeachingStaff().getTeachingStaffId(),
                newSemesterId,
                source.getComments(),
                source.getIncludeInBudget(),
                source.getBudgetPosition(),
                source.getIndustryCoefficient(),
                source.getVacationMonths(),
                source.getWorkingMonths(),
                source.getGroupAmount(),
                source.getGroupForSemester().getClassId(),
                source.getCourse().getCourseId(),
                source.getAcademicRankDetails().getAcademicRankDetailsId(),
                source.getMyClasses().stream()
                        .map(MyClass::getClassId)
                        .mapToInt(Integer::intValue)
                        .toArray(),
                source.getCreditPointsPerGroup()
        );
    }

    // Dashboard API methods
    public Map<String, Object> getWorkloadSummary(Semester semester, MyUser user) {
        List<Workload> workloads;

        TeachingStaff staff = teachingStaffRepo.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("No teaching staff found for user:" + user.getEmail()));
        workloads = workloadRepo.findByTeachingStaffAndSemester(staff, semester);

        Map<String, Object> summary = new HashMap<>();

        // Calculate totals
        double totalExpectedSalary = 0;
        double totalContactHours = 0;
        double totalCreditPoints = 0;
        double monthlyExpectedSalary = 0;
        int totalGroups = 0;

        for (Workload workload : workloads) {
            totalExpectedSalary += workload.getExpectedSalary();
            totalContactHours += workload.getContactHours();
            totalCreditPoints += workload.getTotalCreditPoints();
            totalGroups += workload.getGroupAmount();
            monthlyExpectedSalary += workload.getSalaryPerMonth();
        }

        summary.put("totalWorkloads", workloads.size());
        summary.put("totalExpectedSalary", totalExpectedSalary);
        summary.put("monthlyExpectedSalary", monthlyExpectedSalary);
        summary.put("totalContactHours", totalContactHours);
        summary.put("totalCreditPoints", totalCreditPoints);
        summary.put("totalGroups", totalGroups);
        summary.put("semesterName", semester.getSemesterName());
        summary.put("semesterYear", semester.getSemesterYear());

        return summary;
    }

    public List<Map<String, Object>> getClassDistribution(Semester semester, MyUser user) {
        List<Workload> workloads;

            TeachingStaff staff = teachingStaffRepo.findByUser(user)
                    .orElseThrow(() -> new EntityNotFoundException("No teaching staff found for user: " + user.getEmail()));
            workloads = workloadRepo.findByTeachingStaffAndSemester(staff, semester);

        Map<String, Double> classDistribution = new HashMap<>();

        for (Workload workload : workloads) {
            if (workload.getGroupForSemester() != null) {
                String className = workload.getGroupForSemester().getClassLevel() + workload.getGroupForSemester().getClassProgram();
                double currentCreditPoints = classDistribution.getOrDefault(className, 0.0);
                classDistribution.put(className, currentCreditPoints + workload.getTotalCreditPoints());
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, Double> entry : classDistribution.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("className", entry.getKey());
            item.put("creditPoints", entry.getValue());
            result.add(item);
        }

        return result;
    }

    public List<Map<String, Object>> getCourseDistribution(Semester semester, MyUser user) {
        List<Workload> workloads;
        TeachingStaff staff = teachingStaffRepo.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("No teaching staff found for user: " + user.getEmail()));
        workloads = workloadRepo.findByTeachingStaffAndSemester(staff, semester);

        Map<String, Double> courseDistribution = new HashMap<>();

        for (Workload workload : workloads) {
            if (workload.getCourse() != null) {
                String courseName = workload.getCourse().getCourseName();
                if (courseName != null) {
                    double currentCreditPoints = courseDistribution.getOrDefault(courseName, 0.0);
                    courseDistribution.put(courseName, currentCreditPoints + workload.getTotalCreditPoints());
                }
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, Double> entry : courseDistribution.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("courseName", entry.getKey());
            item.put("creditPoints", entry.getValue());
            result.add(item);
        }

        return result;
    }

    public List<Map<String, Object>> getFacultyDistribution(Semester semester, MyUser user) {
        List<Workload> workloads;

        TeachingStaff staff = teachingStaffRepo.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("No teaching staff found for user: " + user.getEmail()));
        workloads = workloadRepo.findByTeachingStaffAndSemester(staff, semester);

        Map<String, Double> facultyDistribution = new HashMap<>();

        for (Workload workload : workloads) {
            if (workload.getGroupForSemester() != null && workload.getGroupForSemester().getClassFaculty() != null) {
                String facultyName = workload.getGroupForSemester().getClassFaculty().getFacultyName();
                double currentAmount = facultyDistribution.getOrDefault(facultyName, 0.0);
                facultyDistribution.put(facultyName, currentAmount + workload.getTotalCreditPoints());
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, Double> entry : facultyDistribution.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("faculty", entry.getKey());
            item.put("creditPoints", entry.getValue());
            result.add(item);
        }

        return result;
    }
}