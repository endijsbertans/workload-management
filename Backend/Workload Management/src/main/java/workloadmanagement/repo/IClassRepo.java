package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.model.Class;

@Repository
public interface IClassRepo extends CrudRepository<Class, Integer> {
}
