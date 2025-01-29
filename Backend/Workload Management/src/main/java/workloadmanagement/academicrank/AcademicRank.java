package workloadmanagement.academicrank;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "academic_rank")
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AcademicRank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "academic_rank_id")
    private int academicRankId;
    @NotNull
    @Column(name = "rank_name")
    @Size.List({
            @Size(min = 5, message = "{validation.name.size.too_short}"),
            @Size(max = 45, message = "{validation.name.size.too_long}")
    })
    private String rankName;

    @NotNull
    private double  cpForSpring;

    @NotNull
    private double cpForAutumn;

    @NotNull
    @Column(name = "abbreviation")
    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 10, message = "{validation.name.size.too_long}")
    })
    private String abbreviation;

    @NotNull
    private double salary;

}
