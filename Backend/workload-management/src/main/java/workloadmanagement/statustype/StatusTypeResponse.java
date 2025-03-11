package workloadmanagement.statustype;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatusTypeResponse {
    private int statusTypeId;
    private String statusTypeName;
    private boolean isDeleted;
}
