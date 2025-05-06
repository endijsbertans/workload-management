package workloadmanagement.workload;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import workloadmanagement.semester.Semester;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.List;

@Repository
public interface IWorkloadRepo extends JpaRepository<Workload, Integer>, JpaSpecificationExecutor<Workload> {

    Page<Workload> findByTeachingStaff(TeachingStaff teachingStaff, Pageable pageable);

    List<Workload> findBySemester(Semester semester);

    List<Workload> findByTeachingStaffAndSemester(TeachingStaff teachingStaff, Semester semester);
}
