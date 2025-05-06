package workloadmanagement.semester;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.academicrank.academicrankdetails.AcademicRankDetailsService;
import workloadmanagement.workload.WorkloadService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("semester")
public class SemesterController {
    private final SemesterService semesterService;
    private final AcademicRankDetailsService academicRankDetailsService;
    private final WorkloadService workloadService;
    @PostMapping
    public ResponseEntity<Integer> saveSemester(
            @Valid @RequestBody SemesterRequest request){
        return ResponseEntity.ok(semesterService.save(request));
    }
    @PatchMapping("{semesterId}")
    public ResponseEntity<Integer> updateSemesterById(
            @PathVariable Integer semesterId,
            @Valid @RequestBody SemesterRequest request
    ){
        return ResponseEntity.ok(semesterService.update(semesterId, request));
    }
    @DeleteMapping("{semesterId}")
    public ResponseEntity<Integer> deleteSemesterById(
            @PathVariable Integer semesterId
    ){
        return ResponseEntity.ok(semesterService.delete(semesterId));
    }
    @GetMapping("{semesterId}")
    public ResponseEntity<SemesterResponse> findSemesterById(
            @PathVariable Integer semesterId){
        return ResponseEntity.ok(semesterService.findById(semesterId));
    }
    @GetMapping
    public ResponseEntity<List<SemesterResponse>> findAllSemesters(){
        return ResponseEntity.ok(semesterService.findAllStatusTypes());
    }

    @GetMapping("{semesterId}/previous-year")
    public ResponseEntity<SemesterResponse> findPreviousYearSemester(@PathVariable Integer semesterId) {
        Semester currentSemester = semesterService.findSemesterFromResponseId(semesterId);
        Optional<Semester> previousYearSemester = semesterService.findPreviousYearSemester(currentSemester);

        return previousYearSemester
                .map(semester -> ResponseEntity.ok(semesterService.findById(semester.getSemesterId())))
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping("{targetSemesterId}/copy-academic-ranks/{sourceSemesterId}")
    public ResponseEntity<Integer> copyAcademicRanksFromSemester(
            @PathVariable Integer targetSemesterId,
            @PathVariable Integer sourceSemesterId) {

        Semester targetSemester = semesterService.findSemesterFromResponseId(targetSemesterId);
        Semester sourceSemester = semesterService.findSemesterFromResponseId(sourceSemesterId);

        int copiedCount = academicRankDetailsService.copyAcademicRankDetailsFromSemester(sourceSemester, targetSemester);
        return ResponseEntity.ok(copiedCount);
    }


    @GetMapping("most-recent")
    public ResponseEntity<SemesterResponse> findMostRecentSemester() {
        Optional<Semester> mostRecentSemester = semesterService.findMostRecentSemester();

        return mostRecentSemester
                .map(semester -> ResponseEntity.ok(semesterService.findById(semester.getSemesterId())))
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping("{targetSemesterId}/copy-workloads/{sourceSemesterId}")
    public ResponseEntity<Integer> copyWorkloadsFromSemester(
            @PathVariable Integer targetSemesterId,
            @PathVariable Integer sourceSemesterId) {

        Semester targetSemester = semesterService.findSemesterFromResponseId(targetSemesterId);
        Semester sourceSemester = semesterService.findSemesterFromResponseId(sourceSemesterId);

        int copiedCount = workloadService.copyWorkloadsFromSemester(sourceSemester, targetSemester);
        return ResponseEntity.ok(copiedCount);
    }
}
