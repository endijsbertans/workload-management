package workloadmanagement.workload;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.auth.security.user.MyUser;
import workloadmanagement.common.PageResponse;

import java.util.Map;


@RestController
@RequestMapping("workload")
@RequiredArgsConstructor
@Tag(name = "Workload")
public class WorkloadController {
    private final WorkloadService workloadService;
    @PostMapping
    public ResponseEntity<Integer> saveWorkload(
            @Valid @RequestBody WorkloadRequest request
    ){
        return ResponseEntity.ok(workloadService.save(request));
    }
    @PatchMapping("{workloadId}")
    public ResponseEntity<Integer> updateWorkloadById(
            @PathVariable Integer workloadId,
            @Valid @RequestBody WorkloadRequest request
    ){
        return ResponseEntity.ok(workloadService.update(workloadId, request));
    }
    @GetMapping("{workloadId}")
    public ResponseEntity<WorkloadResponse> findWorkloadById(
            @PathVariable Integer workloadId
    ){
        return ResponseEntity.ok(workloadService.findById(workloadId));
    }
    @DeleteMapping("{workloadId}")
    public ResponseEntity<Integer> deleteWorkloadById(
            @PathVariable Integer workloadId
    ){
        return ResponseEntity.ok(workloadService.delete(workloadId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<WorkloadResponse>> findAllWorkloads(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "50") int size,
            @RequestParam(name = "sort", defaultValue = "teachingStaff.name") String sort,
            @RequestParam(name = "direction", defaultValue = "asc") String direction,
            @RequestParam(name = "filters", required = false) String filtersJson
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);
        Map<String, FilterCriteria> filters = null;
        if (filtersJson != null && !filtersJson.isEmpty()) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                filters = mapper.readValue(filtersJson,
                        new TypeReference<Map<String, FilterCriteria>>() {});
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid filter format", e);
            }
        }

        return ResponseEntity.ok(workloadService.findAllWorkloads(pageable, filters));
    }
    @GetMapping("/my-workloads")
    public ResponseEntity<PageResponse<?>> findAllMyWorkloads(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "50") int size,
            @RequestParam(name = "sort", defaultValue = "teachingStaff.name") String sort,
            @RequestParam(name = "direction", defaultValue = "asc") String direction,
            @RequestParam(name = "filters", required = false) String filtersJson,
            Authentication connectedUser
    ) {
        MyUser user = (MyUser) connectedUser.getPrincipal();
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);
        Map<String, FilterCriteria> filters = null;
        if (filtersJson != null && !filtersJson.isEmpty()) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                filters = mapper.readValue(filtersJson,
                        new TypeReference<Map<String, FilterCriteria>>() {});
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid filter format", e);
            }
        }

        return ResponseEntity.ok(workloadService.findAllUserWorkloads(pageable, filters, user));
    }

}
