package workloadmanagement.teachingstaff;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.auth.security.user.MyUser;

import java.util.List;
import java.util.Optional;

@Repository
public interface ITeachingStaffRepo extends CrudRepository<TeachingStaff, Integer> {

    List<TeachingStaff> findByIsDeletedFalse();

    Optional<TeachingStaff> findByUser(MyUser user);
}
