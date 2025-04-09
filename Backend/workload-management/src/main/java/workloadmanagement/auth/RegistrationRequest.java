package workloadmanagement.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Builder
public class RegistrationRequest {

    @NotEmpty(message = "Email is required")
    @NotBlank(message = "Email is required")
    @Email(message = "Email is invalid")
    private String email;

    private boolean admin = false; // Default to regular user role

    // Add explicit getter for admin field to avoid Lombok generating isAdmin()
    public boolean getAdmin() {
        return admin;
    }

//    @NotEmpty(message = "Password is required")
//    @NotBlank(message = "Password is required")
//    @Size(min = 8, message = "Password must be at least 8 characters long")
//    private String password;
}
