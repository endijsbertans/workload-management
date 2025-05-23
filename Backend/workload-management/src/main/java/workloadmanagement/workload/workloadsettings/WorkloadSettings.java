package workloadmanagement.workload.workloadsettings;

import jakarta.persistence.*;
import lombok.*;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@ToString
public class WorkloadSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int workloadSettingsId;
    private boolean isGlobal;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private TeachingStaff teachingStaffStaff;

    private String settingName;

    @ElementCollection
    @CollectionTable(name = "workload_visible_columns",
            joinColumns = @JoinColumn(name = "settings_id"))
    private List<String> visibleColumns = new ArrayList<>();

    private boolean isDefault;

}
