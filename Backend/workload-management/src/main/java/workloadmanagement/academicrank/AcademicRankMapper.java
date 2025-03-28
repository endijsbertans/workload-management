package workloadmanagement.academicrank;
import org.springframework.stereotype.Service;

@Service
public class AcademicRankMapper {
    public AcademicRank toAcademicRank(AcademicRankRequest request){
        return AcademicRank.builder()
                .rankName(request.rankName())
                .abbreviation(request.abbreviation())
                .isDeleted(false)
                .build();
    }

    public AcademicRankResponse toAcademicRankResponse(AcademicRank academicRank){
        return AcademicRankResponse.builder()
                .academicRankId(academicRank.getAcademicRankId())
                .rankName(academicRank.getRankName())
                .abbreviation(academicRank.getAbbreviation())
                .isDeleted(academicRank.isDeleted())
                .build();
    }
}
