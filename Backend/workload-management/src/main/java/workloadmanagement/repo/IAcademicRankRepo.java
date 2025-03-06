package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.academicrank.AcademicRank;

@Repository
public interface IAcademicRankRepo extends CrudRepository<AcademicRank, Integer> {
}
