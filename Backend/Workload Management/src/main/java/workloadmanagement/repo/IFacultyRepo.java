package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.model.Faculty;


@Repository

public interface IFacultyRepo extends CrudRepository<Faculty, Integer> {
}
