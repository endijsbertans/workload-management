package workloadmanagement.semester;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;


public record SemesterRequest (
        @Size.List(value = {
                @Size(min = 1, message = "180"),
                @Size(max = 45, message = "180")
        })
        @NotNull(message = "180")
        @NotEmpty(message = "180")
        SemesterEnum semesterName,
        @NotNull(message = "1")
        int year
){}
