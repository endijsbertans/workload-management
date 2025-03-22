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
public class StatusType{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int statusTypeId;
    private String statusTypeName;
    private boolean isDeleted;
}
