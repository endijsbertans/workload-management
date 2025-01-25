package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.model.AcademicRank;

@Repository
public interface IAcademicRank extends CrudRepository<AcademicRank, Integer> {
}
