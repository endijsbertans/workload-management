package workloadmanagement.MyClass;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import workloadmanagement.faculty.FacultyResponse;

public record MyClassRequest (
    @Size.List({
            @Size(min = 1, message = "130"),
            @Size(max = 45, message = "130")
    })
    @NotNull(message = "130")
    @NotEmpty(message = "130")
    String className,

    @NotNull(message = "132")
    int classFacultyId,
    String myClassProgram
){}
