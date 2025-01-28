package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.teachingstaff.TeachingStaff;

@Repository
public interface ITeachingStaffRepo extends CrudRepository<TeachingStaff, Integer> {
}
