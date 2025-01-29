package workloadmanagement.auth;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import workloadmanagement.email.EmailService;
import workloadmanagement.email.EmailTemplateName;
import workloadmanagement.security.JwtService;
import workloadmanagement.security.MyToken;
import workloadmanagement.repo.IMyAuthorityRepo;
import workloadmanagement.security.MyUser;
import workloadmanagement.repo.IMyUserRepo;
import workloadmanagement.repo.ITokenRepo;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final IMyAuthorityRepo authorityRepository;
    private final PasswordEncoder passwordEncoder;
    private final IMyUserRepo userRepo;
    private final ITokenRepo tokenRepo;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;
    public void register(RegistrationRequest request) throws MessagingException {
        var authorities = authorityRepository.findByTitle("USER")
                .orElseThrow(() -> new IllegalStateException("Role user not found"));
        var user = MyUser.builder()
                .name(request.getFirstName())
                .surname(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .authorities(List.of(authorities))
                .build();
        userRepo.save(user);
        sendValidationEmail(user);
    }
    private void sendValidationEmail(MyUser user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(
                user.getEmail(),
                user.fullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                "http://localhost:8080/api/v1/registration/confirm?token=" + newToken,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(MyUser user) {
        String generatedToken = generateActivationCode(6);
        var token = MyToken.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepo.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String character = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(character.length());
            codeBuilder.append(character.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var claims = new HashMap<String, Object>();
        var user = ((MyUser) auth.getPrincipal());
        claims.put("fullName", user.fullName());
        var jwtToken = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    @Transactional
    public void activateAccount(String token) throws MessagingException {
        MyToken savedToken = tokenRepo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token not found"));
        if(LocalDateTime.now().isAfter(savedToken.getExpiresAt())){
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Token expired, new token sent");
        }
        var user = userRepo.findById(savedToken.getUser().getId())
                //TODO BETTER EXCEPTION HANDLING
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepo.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepo.save(savedToken);
    }
}
