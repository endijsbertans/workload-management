package workloadmanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import workloadmanagement.security.MyAuthority;

import java.util.Optional;

public interface IMyAuthorityRepo extends JpaRepository<MyAuthority, Integer> {
    Optional<MyAuthority> findByTitle(String title);
}
