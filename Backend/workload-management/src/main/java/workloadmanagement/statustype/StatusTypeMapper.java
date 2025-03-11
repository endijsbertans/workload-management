package workloadmanagement.statustype;

import org.springframework.stereotype.Service;

@Service
public class StatusTypeMapper {
    public StatusType toStatusType(StatusTypeRequest request){
        return StatusType.builder()
                .statusTypeName(request.statusTypeName())
                .isDeleted(false)
                .build();
    }
    public StatusTypeResponse toStatusTypeResponse(StatusType statusType){
        return StatusTypeResponse.builder()
                .statusTypeId(statusType.getStatusTypeId())
                .statusTypeName(statusType.getStatusTypeName())
                .isDeleted(statusType.isDeleted())
                .build();
    }
}
