package workloadmanagement.academicrank.academicrankDetails;
import org.springframework.stereotype.Service;
import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetailsService.AcademicRankDetailsEntities;


@Service
public class AcademicRankDetailsMapper {
    public AcademicRankDetails toAcademicRankDetails(AcademicRankDetailsRequest request, AcademicRankDetailsEntities entities){
        return AcademicRankDetails.builder()
                .cpForFullTime(request.cpForFullTime())
                .salary(request.salary())
                .contactHoursForFullTime(request.contactHoursForFullTime())
                .semester(entities.semester())
                .academicRank(entities.academicRank())
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
