package workloadmanagement.academicrank.academicrankDetails;

import jakarta.validation.constraints.NotNull;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.semester.Semester;

public record AcademicRankDetailsRequest (
        @NotNull(message = "181")
         double  cpForFullTime,
         @NotNull(message = "182")
         double salary,
         @NotNull(message = "183")
         double contactHoursForFullTime,
         @NotNull(message = "184")
         Semester semester,
         @NotNull(message = "185")
         AcademicRank academicRank
){
}
