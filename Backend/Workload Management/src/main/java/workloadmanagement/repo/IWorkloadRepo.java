package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.workload.Workload;

@Repository
public interface IWorkloadRepo extends CrudRepository<Workload, Integer> {


}
