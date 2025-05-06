package workloadmanagement.auth.security.authority;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IMyAuthorityRepo extends JpaRepository<MyAuthority, Integer> {
    Optional<MyAuthority> findByTitle(String title);
}
