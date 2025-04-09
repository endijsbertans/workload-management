package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.semester.Semester;
import workloadmanagement.semester.SemesterEnum;

import java.util.List;
import java.util.Optional;

@Repository
public interface ISemesterRepo extends CrudRepository<Semester, Integer> {
    List<Semester> findByIsDeletedFalse();

    // Find semester by year and semester name
    Optional<Semester> findBySemesterYearAndSemesterName(int year, SemesterEnum semesterName);

    // Find semesters from previous year
    List<Semester> findBySemesterYearAndIsDeletedFalse(int year);

    // Find all semesters ordered by year descending
    List<Semester> findByIsDeletedFalseOrderBySemesterYearDesc();
}
