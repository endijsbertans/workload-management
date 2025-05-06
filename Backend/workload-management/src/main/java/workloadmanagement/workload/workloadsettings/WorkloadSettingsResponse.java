package workloadmanagement.workload.workloadsettings;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkloadSettingsResponse {
    private int workloadSettingsId;
    private String settingName;
    private List<String> visibleColumns;
    private boolean isDefault;
}
