package workloadmanagement.workload.WorkloadSettings;

import org.springframework.stereotype.Service;
import workloadmanagement.teachingstaff.TeachingStaff;


@Service
public class WorkloadSettingsMapper {
    public WorkloadSettings toWorkloadSettings(WorkloadSettingsRequest request, TeachingStaff tStaff) {
        return WorkloadSettings.builder()
                .settingName(request.settingName())
                .teachingStaffStaff(tStaff)
                .isGlobal(request.isGlobal())
                .visibleColumns(request.visibleColumns())
                .isDefault(request.isDefault())
                .build();
    }

    public WorkloadSettingsResponse toWorkloadSettingsResponse(WorkloadSettings wSettings) {
        return WorkloadSettingsResponse.builder()
                .settingName(wSettings.getSettingName())
                .WorkloadSettingsId(wSettings.getWorkloadSettingsId())
                .visibleColumns(wSettings.getVisibleColumns())
                .isDefault(wSettings.isDefault())
                .build();
    }
}
