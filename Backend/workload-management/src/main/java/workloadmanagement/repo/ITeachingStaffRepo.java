package workloadmanagement.repo;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.auth.security.MyUser;
import workloadmanagement.teachingstaff.TeachingStaff;

import java.util.List;
import java.util.Optional;

@Repository
public interface ITeachingStaffRepo extends CrudRepository<TeachingStaff, Integer> {
    List<TeachingStaff> findByIsDeletedFalse();

    Optional<TeachingStaff> findByUser(MyUser user);
}
