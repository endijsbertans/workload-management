package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.model.MyAuthority;
@Repository
public interface IMyAuthorityRepo extends CrudRepository<MyAuthority, Integer> {
}
