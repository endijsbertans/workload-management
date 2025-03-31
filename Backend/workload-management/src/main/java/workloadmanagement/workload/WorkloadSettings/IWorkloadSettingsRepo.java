package workloadmanagement.workload.WorkloadSettings;

import org.springframework.data.jpa.repository.JpaRepository;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.List;

public interface IWorkloadSettingsRepo extends JpaRepository<WorkloadSettings, Integer>{
    List<WorkloadSettings> findByTeachingStaffStaff(TeachingStaff staff);
}
