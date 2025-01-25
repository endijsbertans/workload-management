package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import workloadmanagement.model.MyAuthority;

public interface IMyAuthorityRepo extends CrudRepository<MyAuthority, Integer> {
}
