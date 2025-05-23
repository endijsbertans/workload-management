package workloadmanagement.academicrank;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@AllArgsConstructor
@SuperBuilder
@NoArgsConstructor
@ToString
public class AcademicRank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int academicRankId;
    private String rankName;
    private String abbreviation;
    private boolean isDeleted;
}
