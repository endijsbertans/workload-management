package workloadmanagement.workload.workloadsettings;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.auth.security.user.MyUser;


import java.util.List;
@RestController
@RequestMapping("workload-settings")
@RequiredArgsConstructor
@Tag(name = "WorkloadSettings")
public class WorkloadSettingsController {
    private final WorkloadSettingsService workloadSettingsService;
    @PostMapping
    public ResponseEntity<Integer> saveWorkloadSettings(
            @Valid @RequestBody WorkloadSettingsRequest request,
            Authentication connectedUser){
        MyUser user = (MyUser) connectedUser.getPrincipal();
        return ResponseEntity.ok(workloadSettingsService.save(request, user));
    }
    @PatchMapping("{workloadSettingsId}")
    public ResponseEntity<Integer> updateWorkloadSettingsById(
            @PathVariable Integer workloadSettingsId,
            @Valid @RequestBody WorkloadSettingsRequest request,
            Authentication connectedUser
    ){
        MyUser user = (MyUser) connectedUser.getPrincipal();
        return ResponseEntity.ok(workloadSettingsService.update(workloadSettingsId, request, user));
    }
    @DeleteMapping("{workloadSettingsId}")
    public ResponseEntity<Integer> deleteWorkloadSettingsById(
            @PathVariable Integer workloadSettingsId
    ){
        return ResponseEntity.ok(workloadSettingsService.delete(workloadSettingsId));
    }
    @GetMapping("{workloadSettingsId}")
    public ResponseEntity<WorkloadSettingsResponse> findWorkloadSettingsById(
            @PathVariable Integer workloadSettingsId){
        return ResponseEntity.ok(workloadSettingsService.findById(workloadSettingsId));
    }
    @GetMapping
    public ResponseEntity<List<WorkloadSettingsResponse>> findAllWorkloadSettings(Authentication connectedUser){
        MyUser user = (MyUser) connectedUser.getPrincipal();
        return ResponseEntity.ok(workloadSettingsService.findAllStatusTypes(user));
    }
}
