package workloadmanagement.academicrank;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAcademicRankRepo extends CrudRepository<AcademicRank, Integer> {
    List<AcademicRank> findByIsDeletedFalse();
}
