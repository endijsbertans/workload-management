package workloadmanagement.semester;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.statustype.StatusTypeRequest;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("semester")
public class SemesterController {
    private final SemesterService semesterService;
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
}
