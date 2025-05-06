package workloadmanagement.academicrank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AcademicRankRequest (

    @Size(min = 5, message = "151")
    @Size(max = 45, message = "151")
    @NotNull(message = "151")
    @NotEmpty(message = "151")
    String rankName,

    @Size(min = 1, message = "154")
    @Size(max = 45, message = "154")
    @NotNull(message = "154")
    @NotEmpty(message = "154")
    String abbreviation

){}
