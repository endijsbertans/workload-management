package workloadmanagement.model.security;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.security.auth.Subject;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name="_user")
@Entity
@SuperBuilder
@EntityListeners(AuditingEntityListener.class)
public class MyUser implements UserDetails, Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;

    @NotNull
    @Size(min = 3, max = 45)
    @Column(name = "email", unique = true)
    private String email;

    @NotNull
    @Pattern(regexp = "[A-Za-z.]+")
    @Size(min = 3, max = 20)
    @Column(name = "name")
    private String name;

    @NotNull
    @Pattern(regexp = "[A-Za-z.]+")
    @Size(min = 3, max = 20)
    @Column(name = "surname")
    private String surname;

    @NotNull
    @Column(name = "password")
    private String password;
    private boolean accountLocked;
    private boolean enabled;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
    private Collection<MyAuthority> authorities = new ArrayList<>();
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities.stream().map(r-> new SimpleGrantedAuthority(r.getTitle())).collect(Collectors.toList());
    }
    public MyUser(String name, String surname, String email, String password, MyAuthority... auths) {
        setName(name);
        setSurname(surname);
        setEmail(email);
        setPassword(password);
        for (MyAuthority tempA : auths)
            addAuthority(tempA);
    }

    public void addAuthority(MyAuthority authority) {
        if (!authorities.contains(authority))
            authorities.add(authority);
    }

    public void removeAuthority(MyAuthority authority) {
        if (authorities.contains(authority))
            authorities.remove(authority);
    }

    @Override
    public String getName() {
        return email;
    }

    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean implies(Subject subject) {
        return enabled;
    }
    public String fullName(){
        return name + " " + surname;
    }

}