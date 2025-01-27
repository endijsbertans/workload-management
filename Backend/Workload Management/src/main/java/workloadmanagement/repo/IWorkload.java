package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.model.Workload;

@Repository
public interface IWorkload extends CrudRepository<Workload, Integer> {
}
