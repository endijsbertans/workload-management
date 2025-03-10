package workloadmanagement.MyClass;

import jakarta.validation.constraints.NotNull;


public record MyClassRequest (
    @NotNull(message = "130")
    int classLevel,
    @NotNull(message = "132")
    int classFacultyId,
    @NotNull(message = "132")
    String myClassProgram,
    @NotNull(message = "132")
    Degree degree
){}
