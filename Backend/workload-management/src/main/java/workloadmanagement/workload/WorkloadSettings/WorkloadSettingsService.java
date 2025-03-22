package workloadmanagement.workload.WorkloadSettings;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.semester.SemesterService;
import workloadmanagement.teachingstaff.TeachingStaff;
import workloadmanagement.teachingstaff.TeachingStaffService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkloadSettingsService {
    private final WorkloadSettingsMapper workloadSettingsMapper;
    private final IWorkloadSettingsRepo workloadSettingsRepo;
    private final TeachingStaffService teachingStaffService;

    public Integer save(@Valid WorkloadSettingsRequest request) {
       // TeachingStaff teachingStaff = teachingStaffService.findTeachingStaffFromResponseId(request.teachingStaffId());
        WorkloadSettings workloadSettings = workloadSettingsMapper.toWorkloadSettings(request);
        return workloadSettingsRepo.save(workloadSettings).getWorkloadSettingsId();
    }

    public Integer update(Integer semesterId, @Valid WorkloadSettingsRequest request) {
        WorkloadSettings existingSettings = findWorkloadSettingsById(semesterId);
       // TeachingStaff teachingStaff = teachingStaffService.findTeachingStaffFromResponseId(request.teachingStaffId());
        WorkloadSettings updatedSettings = workloadSettingsMapper.toWorkloadSettings(request);
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

    public List<WorkloadSettingsResponse> findAllStatusTypes() {
        List<WorkloadSettings> settings = workloadSettingsRepo.findAll();
        System.out.println(settings.stream()
                .map(workloadSettingsMapper::toWorkloadSettingsResponse)
                .toList());
        return settings.stream()
                .map(workloadSettingsMapper::toWorkloadSettingsResponse)
                .toList();
    }

    private WorkloadSettings findWorkloadSettingsById(Integer id) {
        return workloadSettingsRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Workload settings with id: " + id + " not found."));
    }
}
