package workloadmanagement.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import workloadmanagement.workload.Workload;

@Repository
public interface IWorkloadRepo extends JpaRepository<Workload, Integer> {
//    @Query("""
//        SELECT workload FROM Workload workload
//        """)
//    Page<Workload> findAllWorkloads(Pageable pageable);
}
