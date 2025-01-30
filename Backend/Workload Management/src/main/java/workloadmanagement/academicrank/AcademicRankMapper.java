package workloadmanagement.academicrank;
import org.springframework.stereotype.Service;

@Service
public class AcademicRankMapper {
    public AcademicRank toAcademicRank(AcademicRankRequest request){
        return AcademicRank.builder()
                .rankName(request.rankName())
                .cpForSpring(request.cpForSpring())
                .cpForAutumn(request.cpForAutumn())
                .abbreviation(request.abbreviation())
                .salary(request.salary())
                .build();
    }

    public AcademicRankResponse toAcademicRankResponse(AcademicRank academicRank){
        return AcademicRankResponse.builder()
                .rankName(academicRank.getRankName())
                //.cpForSpring(academicRank.getCpForSpring())
                //.cpForAutumn(academicRank.getCpForAutumn())
                .abbreviation(academicRank.getAbbreviation())
                .salary(academicRank.getSalary())
                .build();
    }
}
