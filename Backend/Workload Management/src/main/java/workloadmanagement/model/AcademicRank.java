package workloadmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "academic_rank")
@Getter
@Setter
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
    @Column(name = "cp_for_spring", precision = 6, scale = 3)
    @Max(value = 9999, message = "cp.too.high")
    @Min(value = 0, message = "cp.too.low")
    private BigDecimal  cpForSpring;

    @NotNull
    @Column(name = "cp_for_Autumn", precision = 6, scale = 3)
    @Max(value = 9999, message = "cp.too.high")
    @Min(value = 0, message = "cp.too.low")
    private BigDecimal cpForAutumn;

    @NotNull
    @Column(name = "abbreviation")
    @Size.List({
            @Size(min = 1, message = "{validation.name.size.too_short}"),
            @Size(max = 10, message = "{validation.name.size.too_long}")
    })
    private String abbreviation;

    @NotNull
    @Column(name = "salary", precision = 6, scale = 2)
    @Max(value = 9999, message = "cp.too.high")
    @Min(value = 0, message = "cp.too.low")

    private BigDecimal salary;
    public AcademicRank( String rankName, BigDecimal cpForSpring, BigDecimal cpForAutumn, String abbreviation, BigDecimal salary){
        this.rankName = rankName;
        this.cpForSpring = cpForSpring;
        this.cpForAutumn = cpForAutumn;
        this.abbreviation = abbreviation;
        this.salary = salary;
    }
}
