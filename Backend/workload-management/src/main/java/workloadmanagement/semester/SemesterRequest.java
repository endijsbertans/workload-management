package workloadmanagement.semester;

import jakarta.validation.constraints.NotNull;


public record SemesterRequest (
        @NotNull(message = "180")
        SemesterEnum semesterName,
        @NotNull(message = "181")
        int year
){}
