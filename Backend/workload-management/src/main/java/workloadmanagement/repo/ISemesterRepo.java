package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.semester.Semester;

import java.util.List;


@Repository
public interface ISemesterRepo extends CrudRepository<Semester, Integer> {
    List<Semester> findByIsDeletedFalse();
}
