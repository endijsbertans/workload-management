package workloadmanagement.academicrank;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    public Integer update(Integer academicRankId, @Valid AcademicRankRequest request) {
        AcademicRank existingAcademicRank = findAcademicRankFromResponseId(academicRankId);
        AcademicRank updatedAcademicRank = academicRankMapper.toAcademicRank(request);
        updatedAcademicRank.setAcademicRankId(existingAcademicRank.getAcademicRankId());
        return academicRankRepo.save(updatedAcademicRank).getAcademicRankId();
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
        List<AcademicRank> academicRanks = academicRankRepo.findByIsDeletedFalse();
        return academicRanks.stream()
                .map(academicRankMapper::toAcademicRankResponse)
                .toList();
    }


    public Integer delete(Integer academicRankId) {
        AcademicRank academicRank = findAcademicRankFromResponseId(academicRankId);
        academicRank.setDeleted(true);
        academicRankRepo.save(academicRank);
        return academicRankId;
    }
}
