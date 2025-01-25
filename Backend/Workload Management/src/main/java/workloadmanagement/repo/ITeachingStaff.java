package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.model.TeachingStaff;

@Repository
public interface ITeachingStaff extends CrudRepository<TeachingStaff, Integer> {
}
