package workloadmanagement.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.workload.Workload;

@Repository
public interface IWorkloadRepo extends CrudRepository<Workload, Integer> {
    @Query("""
        SELECT workload FROM Workload workload
        """)
    Page<Workload> findAllWorkloads(Pageable pageable);
}
