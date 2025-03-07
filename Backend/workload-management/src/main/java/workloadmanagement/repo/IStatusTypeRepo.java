package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.statustype.StatusType;

@Repository
public interface IStatusTypeRepo extends CrudRepository<StatusType, Integer> {
}
