package workloadmanagement.workload.workloadsettings;


import java.util.List;

public record WorkloadSettingsRequest (
    boolean isGlobal,
    String settingName,
    List<String> visibleColumns,
    boolean isDefault
){}
