package workloadmanagement.statustype;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IStatusTypeRepo extends CrudRepository<StatusType, Integer> {
    List<StatusType> findByIsDeletedFalse();
}
