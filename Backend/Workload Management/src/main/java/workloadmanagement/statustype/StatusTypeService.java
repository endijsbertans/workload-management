package workloadmanagement.statustype;

import jakarta.persistence.EntityNotFoundException;
import lombok.*;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.IStatusTypeRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatusTypeService {

    private final StatusTypeMapper statusTypeMapper;
    private final IStatusTypeRepo statusTypeRepo;
    public Integer save(StatusTypeRequest request) {
        StatusType statusType = statusTypeMapper.toStatusType(request);
        return statusTypeRepo.save(statusType).getStatusTypeId();
    }

    public StatusTypeResponse findById(Integer statusTypeId) {
        return statusTypeRepo.findById(statusTypeId)
                .map(statusTypeMapper::toStatusTypeResponse)
                .orElseThrow(()-> new EntityNotFoundException("Status Type with id: " + statusTypeId + " not found"));
    }

    public List<StatusTypeResponse> findAllStatusTypes() {
        List<StatusType> statusTypes = (List<StatusType>) statusTypeRepo.findAll();
        return statusTypes.stream()
                .map(statusTypeMapper::toStatusTypeResponse)
                .toList();
    }
}
