package workloadmanagement.academicrank;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.faculty.FacultyResponse;
import workloadmanagement.repo.IAcademicRankRepo;
import java.util.List;
@Service
@RequiredArgsConstructor
public class AcademicRankService {
    private final AcademicRankMapper academicRankMapper;
    private final IAcademicRankRepo academicRankRepo;
    public Integer save(AcademicRankRequest request) {
        AcademicRank academicRank = academicRankMapper.toAcademicRank(request);
        return academicRankRepo.save(academicRank).getAcademicRankId();
    }

    public AcademicRank findAcademicRankFromResponseId(int id) {
        return academicRankRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Academic Rank with id: " + id + " not found."));
    }
    public AcademicRankResponse findById(Integer academicRankId) {
        return academicRankRepo.findById(academicRankId)
                .map(academicRankMapper::toAcademicRankResponse)
                .orElseThrow(() -> new RuntimeException("Academic Rank with id " + academicRankId + " not found."));
    }

    public List<AcademicRankResponse> findAllAcademicRank() {
        List<AcademicRank> academicRanks = (List<AcademicRank>) academicRankRepo.findAll();
        return academicRanks.stream()
                .map(academicRankMapper::toAcademicRankResponse)
                .toList();
    }
}
