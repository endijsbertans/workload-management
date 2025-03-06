package workloadmanagement.workload;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.common.PageResponse;


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
    @PatchMapping("{workload-id}")
    public ResponseEntity<Integer> updateWorkloadById(
            @PathVariable("workload-id") Integer workloadId,
            @Valid @RequestBody WorkloadRequest request
    ){
        return ResponseEntity.ok(workloadService.update(workloadId, request));
    }
    @GetMapping("{workload-id}")
    public ResponseEntity<WorkloadResponse> findWorkloadById(
            @PathVariable("workload-id") Integer workloadId
    ){
        return ResponseEntity.ok(workloadService.findById(workloadId));
    }
    @GetMapping
    public ResponseEntity<PageResponse<WorkloadResponse>> findAllWorkloads(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "50") int size,
            @RequestParam(name = "sort", defaultValue = "teachingStaff.name") String sort,
            @RequestParam(name = "direction", defaultValue = "asc") String direction
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);
        return ResponseEntity.ok(workloadService.findAllWorkloads(pageable));
    }


}
