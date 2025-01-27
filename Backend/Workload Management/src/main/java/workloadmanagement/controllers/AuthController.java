package workloadmanagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.model.security.MyUser;
import workloadmanagement.repo.IMyUserRepo;
import workloadmanagement.service.impl.MyUserServiceImpl;

import java.util.Collections;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    @Autowired
    IMyUserRepo userRepo;
    private final MyUserServiceImpl userService;
    public AuthController(MyUserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MyUser user) {
        // Perform authentication or any other logic here
        boolean isAuthenticated = userService.authenticate(user);
        if (isAuthenticated) {
            // Generate a session token (this is a simplified example)
            String sessionToken = generateSessionToken(user);
            return ResponseEntity.ok(Collections.singletonMap("token", sessionToken));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
    // Example endpoint for getting user data
    @GetMapping("/user")
    public ResponseEntity<?> getUserData(@RequestParam String username) {
        // Logic to fetch user data based on the username
        MyUser user = userService.getUserData(username);
        return ResponseEntity.ok(user);
    }
    private String generateSessionToken(MyUser user) {
        // Logic to generate a session token (e.g., JWT)
        return "session-token-for-" + user.getUsername();
    }
}
