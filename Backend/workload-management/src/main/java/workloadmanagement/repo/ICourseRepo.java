package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.course.Course;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICourseRepo extends CrudRepository<Course, Integer> {
    List<Course> findByIsDeletedFalse();

    Optional<Course> findByCourseCodeAndIsDeletedFalse(String courseCode);
}
