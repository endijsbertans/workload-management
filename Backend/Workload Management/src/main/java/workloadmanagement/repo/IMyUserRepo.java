package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import workloadmanagement.model.MyUser;

public interface IMyUserRepo extends CrudRepository<MyUser, Integer> {
    MyUser findByUsername(String username);
}
