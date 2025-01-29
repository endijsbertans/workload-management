package workloadmanagement.statustype;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@ToString
@Entity
@Table(name="status_type")
public class StatusType{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_type_id")
    private int statusTypeId;

    @Column(name = "status_type_name")
    private String statusTypeName;
}
