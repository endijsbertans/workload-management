package workloadmanagement.academicrank.academicrankDetails;
import org.springframework.stereotype.Service;


@Service
public class AcademicRankDetailsMapper {
    public AcademicRankDetails toAcademicRankDetails(AcademicRankDetailsRequest request){
        return AcademicRankDetails.builder()
                .cpForFullTime(request.cpForFullTime())
                .salary(request.salary())
                .contactHoursForFullTime(request.contactHoursForFullTime())
                .semester(request.semester())
                .academicRank(request.academicRank())
                .build();
    }

    public AcademicRankDetailsResponse toAcademicRankDetailsResponse(AcademicRankDetails academicRankDetails){
        return AcademicRankDetailsResponse.builder()
                .academicRankDetailsId(academicRankDetails.getAcademicRankDetailsId())
                .academicRank(academicRankDetails.getAcademicRank())
                .cpForFullTime(academicRankDetails.getCpForFullTime())
                .salary(academicRankDetails.getSalary())
                .contactHoursForFullTime(academicRankDetails.getContactHoursForFullTime())
                .semester(academicRankDetails.getSemester())
                .build();
    }
}
