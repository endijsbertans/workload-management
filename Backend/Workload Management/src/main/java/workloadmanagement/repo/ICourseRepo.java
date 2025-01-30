package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.config.course.Course;

@Repository
public interface ICourseRepo extends CrudRepository<Course, Integer> {
}
