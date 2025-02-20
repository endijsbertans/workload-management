package workloadmanagement.academicrank;
import org.springframework.stereotype.Service;

@Service
public class AcademicRankMapper {
    public AcademicRank toAcademicRank(AcademicRankRequest request){
        return AcademicRank.builder()
                .rankName(request.rankName())
                .cpForFullTime(request.cpForFullTime())
                .abbreviation(request.abbreviation())
                .salary(request.salary())
                .semester(request.semester())
                .build();
    }

    public AcademicRankResponse toAcademicRankResponse(AcademicRank academicRank){
        return AcademicRankResponse.builder()
                .academicRankId(academicRank.getAcademicRankId())
                .rankName(academicRank.getRankName())
                .cpForFullTime(academicRank.getCpForFullTime())
                .abbreviation(academicRank.getAbbreviation())
                .salary(academicRank.getSalary())
                .semester(academicRank.getSemester())
                .build();
    }
}
