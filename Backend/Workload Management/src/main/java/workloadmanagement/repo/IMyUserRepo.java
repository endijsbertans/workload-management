package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.model.MyUser;
@Repository
public interface IMyUserRepo extends CrudRepository<MyUser, Integer> {
    MyUser findByUsername(String username);
}
