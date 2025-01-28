package workloadmanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import workloadmanagement.security.MyToken;

import java.util.Optional;

public interface ITokenRepo extends JpaRepository<MyToken, Integer>{
    Optional<MyToken> findByToken(String token);
}
