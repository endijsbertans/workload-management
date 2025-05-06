package workloadmanagement.myclass;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.faculty.Faculty;

import java.util.List;
import java.util.Optional;

@Repository
public interface IMyClassRepo extends CrudRepository<MyClass, Integer> {
    List<MyClass> findByIsDeletedFalse();

    Optional<MyClass> findByClassLevelAndClassProgramAndClassFacultyAndDegreeAndIsDeletedFalse(
            int classLevel,
            String classProgram,
            Faculty classFaculty,
            Degree degree);
}
