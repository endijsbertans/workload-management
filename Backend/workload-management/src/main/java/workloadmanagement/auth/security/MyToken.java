package workloadmanagement.auth.security;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import workloadmanagement.auth.security.user.MyUser;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@ToString
@Entity
public class MyToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String token;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private LocalDateTime validatedAt;
    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private MyUser user;
}
