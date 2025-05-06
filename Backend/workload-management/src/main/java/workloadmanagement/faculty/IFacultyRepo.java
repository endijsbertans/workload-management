package workloadmanagement.faculty;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository

public interface IFacultyRepo extends CrudRepository<Faculty, Integer> {
    List<Faculty> findByIsDeletedFalse();
}
