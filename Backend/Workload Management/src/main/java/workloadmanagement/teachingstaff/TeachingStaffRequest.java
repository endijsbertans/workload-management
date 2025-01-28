package workloadmanagement.teachingstaff;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import workloadmanagement.model.AcademicRank;
import workloadmanagement.model.Faculty;
import workloadmanagement.security.MyUser;

public record TeachingStaffRequest(
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        MyUser user,
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
        String staffPhoto){}

