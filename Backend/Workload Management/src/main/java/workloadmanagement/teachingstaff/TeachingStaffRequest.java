package workloadmanagement.teachingstaff;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.security.MyUser;

public record TeachingStaffRequest(
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        MyUser user,
        @Size.List({
                @Size(min = 1, message = "101"),
                @Size(max = 45, message = "101")
        })
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String positionTitle,
        @NotNull(message = "102")
        @NotEmpty(message = "102")
        Faculty staffFacultyId,
        @NotNull(message = "103")
        @NotEmpty(message = "103")
        AcademicRank staffAcademicRankId,
        @NotNull(message = "104")
        @NotEmpty(message = "104")
        String staffPhoto
){}

