package workloadmanagement.academicrank.academicrankdetails;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.semester.Semester;

import java.util.List;
import java.util.Optional;

@Repository
public interface IAcademicRankDetailsRepo extends CrudRepository<AcademicRankDetails, Integer> {
    Optional<AcademicRankDetails> findByAcademicRank_AcademicRankIdAndSemester_SemesterYear(int academicRankId, int semesterYear);

    List<AcademicRankDetails> findByIsDeletedFalse();

    // Find all academic rank details for a specific semester
    List<AcademicRankDetails> findBySemesterAndIsDeletedFalse(Semester semester);

    // Find academic rank details by academic rank ID and semester
    Optional<AcademicRankDetails> findByAcademicRank_AcademicRankIdAndSemester(int academicRankId, Semester semester);
}
