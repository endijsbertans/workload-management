package workloadmanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.auth.security.MyUser;

import java.util.Optional;

@Repository
public interface IMyUserRepo extends JpaRepository<MyUser, Integer> {
    Optional<MyUser> findByEmail(String email);
}
