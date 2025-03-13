package workloadmanagement.workload.WorkloadSettings;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkloadSettingsResponse {
    private int WorkloadSettingsId;
    private String settingName;
    private List<String> visibleColumns;
    private boolean isDefault;
}
