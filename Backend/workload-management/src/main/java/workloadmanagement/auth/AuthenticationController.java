package workloadmanagement.auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication API")
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        service.activateAccount(token);
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(
            @RequestParam String email
    ) throws MessagingException {
        service.forgotPassword(email);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/activate-account/change-password")
    public ResponseEntity<Void> changePassword(
            @RequestParam String token,
            @RequestParam String password
    ) throws MessagingException {
        service.changePassword(token, password);
        return ResponseEntity.ok().build();
    }
}
