package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.statustype.StatusType;

import java.util.List;

@Repository
public interface IStatusTypeRepo extends CrudRepository<StatusType, Integer> {
    List<StatusType> findByIsDeletedFalse();
}
