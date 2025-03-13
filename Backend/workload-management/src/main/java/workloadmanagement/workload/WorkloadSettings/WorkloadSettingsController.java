package workloadmanagement.workload.WorkloadSettings;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.workload.WorkloadResponse;


import java.util.List;
@RestController
@RequestMapping("workload-settings")
@RequiredArgsConstructor
@Tag(name = "WorkloadSettings")
public class WorkloadSettingsController {
    private final WorkloadSettingsService workloadSettingsService;
    @PostMapping
    public ResponseEntity<Integer> saveWorkloadSettings(
            @Valid @RequestBody WorkloadSettingsRequest request){
        return ResponseEntity.ok(workloadSettingsService.save(request));
    }
    @PatchMapping("{semesterId}")
    public ResponseEntity<Integer> updateWorkloadSettingsById(
            @PathVariable Integer semesterId,
            @Valid @RequestBody WorkloadSettingsRequest request
    ){
        return ResponseEntity.ok(workloadSettingsService.update(semesterId, request));
    }
    @DeleteMapping("{semesterId}")
    public ResponseEntity<Integer> deleteWorkloadSettingsById(
            @PathVariable Integer semesterId
    ){
        return ResponseEntity.ok(workloadSettingsService.delete(semesterId));
    }
    @GetMapping("{semesterId}")
    public ResponseEntity<WorkloadSettingsResponse> findWorkloadSettingsById(
            @PathVariable Integer semesterId){
        return ResponseEntity.ok(workloadSettingsService.findById(semesterId));
    }
    @GetMapping
    public ResponseEntity<List<WorkloadSettingsResponse>> findAllWorkloadSettings(){
        return ResponseEntity.ok(workloadSettingsService.findAllStatusTypes());
    }
}
