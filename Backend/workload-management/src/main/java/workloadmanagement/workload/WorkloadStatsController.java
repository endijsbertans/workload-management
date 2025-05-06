package workloadmanagement.workload;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import workloadmanagement.auth.security.user.MyUser;
import workloadmanagement.semester.Semester;
import workloadmanagement.semester.SemesterService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("workload-stats")
@RequiredArgsConstructor
@Tag(name = "WorkloadStats")
public class WorkloadStatsController {
    private final WorkloadService workloadService;
    private final SemesterService semesterService;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getWorkloadSummary(
            @RequestParam(required = false) Integer semesterId,
            Authentication connectedUser
    ) {
        MyUser user = (MyUser) connectedUser.getPrincipal();
        Semester semester = semesterId != null
            ? semesterService.findSemesterFromResponseId(semesterId)
            : semesterService.findCurrentOrLatestSemester();

        Map<String, Object> summary = workloadService.getWorkloadSummary(semester, user);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/class-distribution")
    public ResponseEntity<List<Map<String, Object>>> getClassDistribution(
            @RequestParam(required = false) Integer semesterId,
            Authentication connectedUser
    ) {
        MyUser user = (MyUser) connectedUser.getPrincipal();
        Semester semester = semesterId != null
            ? semesterService.findSemesterFromResponseId(semesterId)
            : semesterService.findCurrentOrLatestSemester();

        List<Map<String, Object>> distribution = workloadService.getClassDistribution(semester, user);
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/course-distribution")
    public ResponseEntity<List<Map<String, Object>>> getCourseDistribution(
            @RequestParam(required = false) Integer semesterId,
            Authentication connectedUser
    ) {
        MyUser user = (MyUser) connectedUser.getPrincipal();
        Semester semester = semesterId != null
            ? semesterService.findSemesterFromResponseId(semesterId)
            : semesterService.findCurrentOrLatestSemester();

        List<Map<String, Object>> distribution = workloadService.getCourseDistribution(semester, user);
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/faculty-distribution")
    public ResponseEntity<List<Map<String, Object>>> getFacultyDistribution(
            @RequestParam(required = false) Integer semesterId,
            Authentication connectedUser
    ) {
        MyUser user = (MyUser) connectedUser.getPrincipal();
        Semester semester = semesterId != null
            ? semesterService.findSemesterFromResponseId(semesterId)
            : semesterService.findCurrentOrLatestSemester();

        List<Map<String, Object>> distribution = workloadService.getFacultyDistribution(semester, user);
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/teacher-comparison")
    public ResponseEntity<List<Map<String, Object>>> getTeacherComparison(
            @RequestParam(required = false) Integer semesterId,
            Authentication connectedUser
    ) {
        MyUser user = (MyUser) connectedUser.getPrincipal();
        Semester semester = semesterId != null
            ? semesterService.findSemesterFromResponseId(semesterId)
            : semesterService.findCurrentOrLatestSemester();

        List<Map<String, Object>> comparison = workloadService.getTeacherComparison(semester, user);
        return ResponseEntity.ok(comparison);
    }
}
