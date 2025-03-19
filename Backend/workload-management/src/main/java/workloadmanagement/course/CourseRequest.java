package workloadmanagement.course;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.AcademicRankResponse;

public record CourseRequest (
    @Size.List({
            @Size(min = 1, message = "140"),
            @Size(max = 45, message = "140")
    })
    @NotNull(message = "140")
    @NotEmpty(message = "140")
    String courseCode,
    @Size.List({
            @Size(min = 1, message = "141"),
            @Size(max = 45, message = "141")
    })
    @NotNull(message = "141")
    @NotEmpty(message = "141")
    String courseName,
    @NotNull(message = "142")
    double creditPoints,

    @Size.List({
            @Size(min = 1, message = "144"),
            @Size(max = 45, message = "144")
    })
    @NotNull(message = "144")
    @NotEmpty(message = "144")
    String registrationType,

    @Size.List({
            @Size(min = 1, message = "146"),
            @Size(max = 90, message = "146")
    })
    @NotNull(message = "146")
    @NotEmpty(message = "146")
    String section
){}
