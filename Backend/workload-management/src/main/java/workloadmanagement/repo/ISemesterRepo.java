package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.semester.Semester;


@Repository
public interface ISemesterRepo extends CrudRepository<Semester, Integer> {
}
