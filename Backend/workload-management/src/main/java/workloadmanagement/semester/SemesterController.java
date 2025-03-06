package workloadmanagement.semester;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("statuses")
public class SemesterController {
    private final SemesterService semesterService;
    @PostMapping
    public ResponseEntity<Integer> saveSemester(
            @Valid @RequestBody SemesterRequest request){
        return ResponseEntity.ok(semesterService.save(request));
    }
    @GetMapping("{statusTypeId}")
    public ResponseEntity<SemesterResponse> findSemesterById(
            @PathVariable Integer statusTypeId){
        return ResponseEntity.ok(semesterService.findById(statusTypeId));
    }
    @GetMapping
    public ResponseEntity<List<SemesterResponse>> findAllSemesters(){
        return ResponseEntity.ok(semesterService.findAllStatusTypes());
    }
}
