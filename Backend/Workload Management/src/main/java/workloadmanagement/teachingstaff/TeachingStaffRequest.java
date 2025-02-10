package workloadmanagement.teachingstaff;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import workloadmanagement.auth.RegistrationRequest;
import workloadmanagement.faculty.FacultyResponse;

public record TeachingStaffRequest(

        RegistrationRequest authDetails,
        @Size.List({
                @Size(min = 1, message = "101"),
                @Size(max = 45, message = "101")
        })
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String positionTitle,
        @NotNull(message = "102")
        FacultyResponse staffFaculty,
// TODO make binding of ACADEMIC RANK
//        @NotNull(message = "103")
//        @NotEmpty(message = "103")
//        AcademicRank staffAcademicRank,

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

