package workloadmanagement.workload.workloadsettings;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.auth.security.user.MyUser;
import workloadmanagement.teachingstaff.ITeachingStaffRepo;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkloadSettingsService {
    private final WorkloadSettingsMapper workloadSettingsMapper;
    private final IWorkloadSettingsRepo workloadSettingsRepo;
    private final ITeachingStaffRepo teachingStaffRepo;

    public Integer save(@Valid WorkloadSettingsRequest request, MyUser user) {
        TeachingStaff tStaff = teachingStaffRepo.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("No teaching staff found for user: " + user.getEmail()));
        WorkloadSettings workloadSettings = workloadSettingsMapper.toWorkloadSettings(request, tStaff);
        return workloadSettingsRepo.save(workloadSettings).getWorkloadSettingsId();
    }

    public Integer update(Integer semesterId, @Valid WorkloadSettingsRequest request, MyUser user) {
        TeachingStaff tStaff = teachingStaffRepo.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("No teaching staff found for user: " + user.getEmail()));
        WorkloadSettings existingSettings = findWorkloadSettingsById(semesterId);
        WorkloadSettings updatedSettings = workloadSettingsMapper.toWorkloadSettings(request, tStaff);
        updatedSettings.setWorkloadSettingsId(existingSettings.getWorkloadSettingsId());

        return workloadSettingsRepo.save(updatedSettings).getWorkloadSettingsId();
    }

    public Integer delete(Integer semesterId) {
        WorkloadSettings settings = findWorkloadSettingsById(semesterId);
        workloadSettingsRepo.delete(settings);
        return semesterId;
    }

    public WorkloadSettingsResponse findById(Integer semesterId) {
        return workloadSettingsRepo.findById(semesterId)
                .map(workloadSettingsMapper::toWorkloadSettingsResponse)
                .orElseThrow(() -> new EntityNotFoundException("Workload settings with id: " + semesterId + " not found."));
    }

    public List<WorkloadSettingsResponse> findAllStatusTypes(MyUser user) {
        TeachingStaff staff = teachingStaffRepo.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("No teaching staff found for user: " + user.getEmail()));

        List<WorkloadSettings> settings = workloadSettingsRepo.findByTeachingStaffStaff(staff);

        return settings.stream()
                .map(workloadSettingsMapper::toWorkloadSettingsResponse)
                .toList();
    }

    private WorkloadSettings findWorkloadSettingsById(Integer id) {
        return workloadSettingsRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Workload settings with id: " + id + " not found."));
    }
}
