package workloadmanagement.course;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICourseRepo extends CrudRepository<Course, Integer> {
    List<Course> findByIsDeletedFalse();

    Optional<Course> findByCourseCodeAndIsDeletedFalse(String courseCode);
}
