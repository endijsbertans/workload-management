package workloadmanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.model.security.MyAuthority;

import java.util.Optional;

public interface IMyAuthorityRepo extends JpaRepository<MyAuthority, Integer> {
    Optional<MyAuthority> findByTitle(String title);
}
