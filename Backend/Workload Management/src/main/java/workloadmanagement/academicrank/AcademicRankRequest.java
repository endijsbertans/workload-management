package workloadmanagement.academicrank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record AcademicRankRequest (
    @NotNull(message = "150")
    @NotEmpty(message = "150")
    int academicRankId,
    @NotNull(message = "151")
    @NotEmpty(message = "151")
    String rankName,
    @NotNull(message = "152")
    @NotEmpty(message = "152")
    double  cpForSpring,
    @NotNull(message = "153")
    @NotEmpty(message = "153")
    double cpForAutumn,
    @NotNull(message = "154")
    @NotEmpty(message = "154")
    String abbreviation,
    @NotNull(message = "155")
    @NotEmpty(message = "155")
    double salary
){}
