package workloadmanagement.workload;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import workloadmanagement.common.PageResponse;
import workloadmanagement.repo.IWorkloadRepo;


import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkloadService {
    private final WorkloadMapper workloadMapper;
    private final IWorkloadRepo workloadRepo;

    public Integer save(WorkloadRequest request) {
        Workload workload = workloadMapper.toWorkload(request);
        return workloadRepo.save(workload).getWorkloadId();
    }
    public WorkloadResponse findById(Integer tstaffId) {
        return workloadRepo.findById(tstaffId)
                .map(workloadMapper::toWorkloadResponse)
                .orElseThrow(() -> new EntityNotFoundException("Teaching staff with id: " + tstaffId + " not found."));
    }
    public PageResponse<WorkloadResponse> findAllWorkloads(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("teachingStaff.lastName").descending());
        Page<Workload> workloads = (Page<Workload>) workloadRepo.findAll();
        List<WorkloadResponse> workloadResponse = workloads.stream()
                .map(workloadMapper::toWorkloadResponse)
                .toList();
        return new PageResponse<>(
            workloadResponse,
            workloads.getNumber(),
            workloads.getSize(),
            workloads.getTotalElements(),
            workloads.getTotalPages(),
            workloads.isFirst(),
            workloads.isLast()
            );

    }


}
