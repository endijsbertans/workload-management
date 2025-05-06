package workloadmanagement.teachingstaff;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import workloadmanagement.auth.RegistrationRequest;

public record TeachingStaffRequest(

        RegistrationRequest authDetails,

        @NotNull(message = "101")
        int statusId,
        @NotNull(message = "102")
        int staffFacultyId,

        @NotNull(message = "103")
        int staffAcademicRankId,

//        @NotNull(message = "104")
//        @NotEmpty(message = "104")
//        String staffPhoto,
        @NotNull(message = "105")
        @NotEmpty(message = "105")
        String name,
        @NotNull(message = "106")
        @NotEmpty(message = "106")
        String surname
){}

