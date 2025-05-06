package workloadmanagement.statustype;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record StatusTypeRequest (

    @Size(min = 1, message = "160")
    @Size(max = 45, message = "160")
    @NotNull(message = "160")
    @NotEmpty(message = "160")
    String statusTypeName
){}
