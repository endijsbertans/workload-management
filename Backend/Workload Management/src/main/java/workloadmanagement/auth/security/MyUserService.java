package workloadmanagement.auth.security;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.IMyUserRepo;

@Service
@RequiredArgsConstructor
public class MyUserService {
    private final IMyUserRepo myUserRepo;

    public MyUser findByEmail(String email) {
        return myUserRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with email: " + email + " not found."));
    }
}
