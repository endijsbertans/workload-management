package workloadmanagement.statustype;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.*;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.IStatusTypeRepo;
import workloadmanagement.teachingstaff.TeachingStaffRequest;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatusTypeService {

    private final StatusTypeMapper statusTypeMapper;
    private final IStatusTypeRepo statusTypeRepo;
    public Integer save(@Valid StatusTypeRequest request) {
        StatusType statusType = statusTypeMapper.toStatusType(request);
        return statusTypeRepo.save(statusType).getStatusTypeId();
    }

    public Integer update(Integer statusTypeId, @Valid StatusTypeRequest request) {
        StatusType existingStatusType = findStatusTypeFromResponseId(statusTypeId);
        StatusType updatedStatusType = statusTypeMapper.toStatusType(request);

        updatedStatusType.setStatusTypeId(existingStatusType.getStatusTypeId());

        return statusTypeRepo.save(updatedStatusType).getStatusTypeId();
    }
    public StatusType findStatusTypeFromResponseId(int id) {
        return statusTypeRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Status Type with id: " + id + " not found."));
    }
    public StatusTypeResponse findById(Integer statusTypeId) {
        return statusTypeRepo.findById(statusTypeId)
                .map(statusTypeMapper::toStatusTypeResponse)
                .orElseThrow(()-> new EntityNotFoundException("Status Type with id: " + statusTypeId + " not found"));
    }

    public List<StatusTypeResponse> findAllStatusTypes() {
        List<StatusType> statusTypes = statusTypeRepo.findByIsDeletedFalse();
        return statusTypes.stream()
                .map(statusTypeMapper::toStatusTypeResponse)
                .toList();
    }

    public Integer delete(Integer statusTypeId) {
        StatusType statusType = findStatusTypeFromResponseId(statusTypeId);
        statusType.setDeleted(true);
        statusTypeRepo.save(statusType);
        return statusTypeId;
    }
}
