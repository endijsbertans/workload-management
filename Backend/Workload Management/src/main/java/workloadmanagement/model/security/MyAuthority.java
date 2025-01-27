package workloadmanagement.model.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Resource;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import workloadmanagement.model.security.MyUser;
import java.util.ArrayList;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "authority")
@Entity
@SuperBuilder
@EntityListeners(AuditingEntityListener.class)
public class MyAuthority {
    @Column(name = "authority_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ida;

    @NotNull
    @Pattern(regexp = "[A-Z]{4,8}", message = "Only letters and space")
    @Column(name = "authority_title", unique = true)
    private String title;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "User_Authority_Table",
            joinColumns = @JoinColumn(name="ida"),
            inverseJoinColumns = @JoinColumn(name = "idu"))
    @ToString.Exclude
    @JsonIgnore
    private Collection<MyUser> users = new ArrayList<MyUser>();


    public MyAuthority(String title)
    {
        setTitle(title);
    }



    public void addUser(MyUser user) {
        if(!users.contains(user))
            users.add(user);
    }

    public void removeUser(MyUser user) {
        if(users.contains(user))
            users.remove(user);
    }
}
