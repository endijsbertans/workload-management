package workloadmanagement.academicrank.academicrankDetails;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAcademicRankDetailsRepo extends CrudRepository<AcademicRankDetails, Integer> {
    Optional<AcademicRankDetails> findByAcademicRank_AcademicRankIdAndSemester_SemesterYear(int academicRankId, int semesterYear);

}
