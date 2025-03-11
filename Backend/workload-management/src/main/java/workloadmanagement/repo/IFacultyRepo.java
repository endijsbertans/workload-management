package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.faculty.Faculty;

import java.util.List;


@Repository

public interface IFacultyRepo extends CrudRepository<Faculty, Integer> {
    List<Faculty> findByIsDeletedFalse();
}
