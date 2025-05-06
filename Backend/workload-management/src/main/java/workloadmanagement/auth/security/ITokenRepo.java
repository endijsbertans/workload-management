package workloadmanagement.auth.security;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ITokenRepo extends JpaRepository<MyToken, Integer>{
    Optional<MyToken> findByToken(String token);
}
