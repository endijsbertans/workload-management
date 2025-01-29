package workloadmanagement.faculty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record FacultyRequest (
    @Size.List({
            @Size(min = 1, message = "150"),
            @Size(max = 10, message = "150")
    })
    @NotNull(message = "150")
    @NotEmpty(message = "150")
    String facultyName,
    @Size.List({
            @Size(min = 5, message = "151"),
            @Size(max = 45, message = "151")
    })
    @NotNull(message = "151")
    @NotEmpty(message = "151")
    String faculty_full_name
){}
