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
import workloadmanagement.auth.security.JwtService;
import workloadmanagement.auth.security.MyToken;
import workloadmanagement.repo.IMyAuthorityRepo;
import workloadmanagement.auth.security.MyUser;
import workloadmanagement.repo.IMyUserRepo;
import workloadmanagement.repo.ITokenRepo;
import workloadmanagement.teachingstaff.TeachingStaff;

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
        // TODO Make admin role and in future use this as adminRegistration
        var authorities = authorityRepository.findByTitle("USER")
                .orElseThrow(() -> new IllegalStateException("Role user not found"));

        System.out.println(request);
        String activationCode = generateActivationCode(6);
        var user = MyUser.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(activationCode)) // random 6 digit temp password
                .accountLocked(false)
                .enabled(false)
                .authorities(List.of(authorities))
                .build();
        System.out.println(user);
        userRepo.save(user);
        sendValidationEmail(user, activationCode);
    }
    public void registerTeachingStaff(RegistrationRequest request, TeachingStaff tStaff) throws MessagingException {
        // TODO Make admin role and in future use this as adminRegistration
        var authorities = authorityRepository.findByTitle("USER")
                .orElseThrow(() -> new IllegalStateException("Role user not found"));
        String activationCode = generateActivationCode(6);
        System.out.println(request);
        var user = MyUser.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(generateActivationCode(6))) // random 6 digit temp password
                .teachingStaff(tStaff)
                .accountLocked(false)
                .enabled(false)
                .authorities(List.of(authorities))
                .build();
        System.out.println(user);
        userRepo.save(user);
        sendValidationEmail(user, activationCode);
    }
    private void sendValidationEmail(MyUser user, String activationCode) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user, activationCode);
        emailService.sendEmail(
                user.getEmail(),
                user.getTeachingStaff().getStaffFullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl + newToken,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(MyUser user, String activationCode) {
        var token = MyToken.builder()
                .token(activationCode)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepo.save(token);
        return activationCode;
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
        claims.put("fullName", user.getTeachingStaff().getStaffFullName());
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
            String activationCode = generateActivationCode(6);
            sendValidationEmail(savedToken.getUser(), activationCode);
            throw new RuntimeException("Token expired, new token sent");
        }
        var user = userRepo.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepo.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepo.save(savedToken);
    }
    @Transactional
    public void changePassword(String token, String newPassword) throws MessagingException {
        MyToken savedToken = tokenRepo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token not found"));

        if(LocalDateTime.now().isAfter(savedToken.getExpiresAt())){
            String activationCode = generateActivationCode(6);
            sendValidationEmail(savedToken.getUser(), activationCode);
            throw new RuntimeException("Token expired, new token sent");
        }
        var user = userRepo.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        savedToken.setExpiresAt(LocalDateTime.now());
        tokenRepo.save(savedToken);
    }
}
