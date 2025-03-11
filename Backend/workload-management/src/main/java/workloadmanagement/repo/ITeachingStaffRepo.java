package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.List;

@Repository
public interface ITeachingStaffRepo extends CrudRepository<TeachingStaff, Integer> {
    List<TeachingStaff> findByIsDeletedFalse();
}
