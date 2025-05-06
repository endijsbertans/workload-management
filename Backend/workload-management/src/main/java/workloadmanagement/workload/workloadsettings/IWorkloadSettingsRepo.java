package workloadmanagement.workload.workloadsettings;

import org.springframework.data.jpa.repository.JpaRepository;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.List;

public interface IWorkloadSettingsRepo extends JpaRepository<WorkloadSettings, Integer>{
    List<WorkloadSettings> findByTeachingStaffStaff(TeachingStaff staff);
}
