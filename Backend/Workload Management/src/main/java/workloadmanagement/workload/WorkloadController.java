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
    @GetMapping("{workload-id}")
    public ResponseEntity<WorkloadResponse> findTeachingStaffById(
            @PathVariable("workload-id") Integer tstaffId
    ){
        return ResponseEntity.ok(workloadService.findById(tstaffId));
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
