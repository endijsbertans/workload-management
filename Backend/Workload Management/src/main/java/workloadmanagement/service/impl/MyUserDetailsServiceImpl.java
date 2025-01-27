package workloadmanagement.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import workloadmanagement.model.security.MyUser;
import workloadmanagement.repo.IMyUserRepo;

@Service
@RequiredArgsConstructor
public class MyUserDetailsServiceImpl implements UserDetailsService {
    private final IMyUserRepo myUserRepo;

    @Override
    @Transactional // To load authorities also
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return myUserRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}