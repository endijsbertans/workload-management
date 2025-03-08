package workloadmanagement.MyClass;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import workloadmanagement.faculty.FacultyResponse;

public record MyClassRequest (
    @NotEmpty(message = "130")
    int classLevel,
    @NotNull(message = "132")
    int classFacultyId,
    @NotNull(message = "132")
    String myClassProgram,
    @NotNull(message = "132")
    Degree degree
){}
