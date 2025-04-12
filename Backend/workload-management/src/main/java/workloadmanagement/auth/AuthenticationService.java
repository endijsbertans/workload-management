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
import workloadmanagement.auth.security.MyAuthority;
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
import java.util.ArrayList;
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

    public void registerUser(RegistrationRequest request, TeachingStaff tStaff) throws MessagingException {
        String roleTitle;

        if (request.getRole() == null) {
            roleTitle = "ROLE_TEACHINGSTAFF";
        } else {
            roleTitle = request.getRole();
        }
        var authority = authorityRepository.findByTitle(roleTitle)
                .orElseThrow(() -> new IllegalStateException("Role " + roleTitle + " not found"));

        System.out.println(request);
        var user = MyUser.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(generateActivationCode(6))) // random 6 digit temp password
                .teachingStaff(tStaff)
                .accountLocked(false)
                .enabled(false)
                .authorities(new ArrayList<>(List.of(authority)))
                .build();
        System.out.println(user);
        userRepo.save(user);
        sendValidationEmail(user);
    }

    public void updateUserRole(MyUser user, String roleTitle) {
        String effectiveRoleTitle = roleTitle != null ? roleTitle : "ROLE_TEACHINGSTAFF";

        var authority = authorityRepository.findByTitle(effectiveRoleTitle)
                .orElseThrow(() -> new IllegalStateException("Role " + effectiveRoleTitle + " not found"));

        List<MyAuthority> authorities = new ArrayList<>();
        authorities.add(authority);
        user.setAuthorities(authorities);
        userRepo.save(user);
    }
    private void sendValidationEmail(MyUser user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(
                user.getEmail(),
                user.getTeachingStaff().getStaffFullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl + newToken,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(MyUser user) {
        String activationCode = generateActivationCode(6);
        while (tokenRepo.findByToken(activationCode).isPresent()) {
            activationCode = generateActivationCode(6);
        }

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
            sendValidationEmail(savedToken.getUser());
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
    public void forgotPassword(String email) throws MessagingException {
        var user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        generateAndSaveActivationToken(user);
        sendValidationEmail(user);
    }
    @Transactional
    public void changePassword(String token, String newPassword) throws MessagingException {
        MyToken savedToken = tokenRepo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token not found"));
        if(LocalDateTime.now().isAfter(savedToken.getExpiresAt())){
            sendValidationEmail(savedToken.getUser());
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
