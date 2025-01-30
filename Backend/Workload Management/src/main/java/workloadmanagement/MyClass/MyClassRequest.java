package workloadmanagement.MyClass;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import workloadmanagement.faculty.Faculty;

public record MyClassRequest (
    @Size.List({
            @Size(min = 1, message = "130"),
            @Size(max = 45, message = "130")
    })
    @NotNull(message = "130")
    @NotEmpty(message = "130")
    String className,

    @Min(value = 0, message = "131")
    @NotNull(message = "131")
    @NotEmpty(message = "131")
    int studyYear,

    @Min(value = 0, message = "131")
    int studentAmount,
    @NotNull(message = "132")
    @NotEmpty(message = "132")
    Faculty classFaculty,

    @NotNull(message = "133")
    @NotEmpty(message = "133")
    String classYear
){}
