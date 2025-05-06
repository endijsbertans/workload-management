package workloadmanagement.faculty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record FacultyRequest (

    @Size(min = 1, message = "150")
    @Size(max = 10, message = "150")
    @NotNull(message = "150")
    @NotEmpty(message = "150")
    String facultyName,

    @Size(min = 5, message = "151")
    @Size(max = 45, message = "151")

    @NotNull(message = "151")
    @NotEmpty(message = "151")
    String facultyFullName
){}
