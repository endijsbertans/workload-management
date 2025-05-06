package workloadmanagement.academicrank.academicrankdetails;

import jakarta.validation.constraints.NotNull;


public record AcademicRankDetailsRequest (
        @NotNull(message = "181")
         double  cpForFullTime,
         @NotNull(message = "182")
         double salary,
         @NotNull(message = "183")
         double contactHoursForFullTime,
         @NotNull(message = "184")
         int semesterId,
         @NotNull(message = "185")
         int academicRankId
){
}
