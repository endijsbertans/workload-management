package workloadmanagement.semester;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;


public record SemesterRequest (
        @NotNull(message = "180")
        SemesterEnum semesterName,
        @NotNull(message = "181")
        int year
){}
