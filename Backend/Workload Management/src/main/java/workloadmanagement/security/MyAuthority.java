package workloadmanagement.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@SuperBuilder
@EntityListeners(AuditingEntityListener.class)
@Table(name = "authority")
public class MyAuthority {

    @Column(name = "authority_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ida;

    @NotNull
    @Pattern(regexp = "^[A-Z ]+$", message = "ONLY UPPERCASE LETTERS AND SPACES")
    @Column(name = "authority_title", unique = true)
    private String title;

    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private List<MyUser> users = new ArrayList<MyUser>();

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;
}
