package workloadmanagement.academicrank.academicrankDetails;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.semester.Semester;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicRankDetailsService {
    private final AcademicRankDetailsMapper academicRankDetailsMapper;
    private final IAcademicRankDetailsRepo academicRankDetailsRepo;
    public Integer save(AcademicRankDetailsRequest request) {
        AcademicRankDetails academicRankDetails = academicRankDetailsMapper.toAcademicRankDetails(request);
        return academicRankDetailsRepo.save(academicRankDetails).getAcademicRankDetailsId();
    }

    public AcademicRankDetails findAcademicRankDetailsFromResponseId(int academicRankId, Semester semester) {
        return academicRankDetailsRepo.findByAcademicRank_AcademicRankIdAndSemester_SemesterYear(academicRankId, semester.getSemesterYear())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Academic Rank with ID: " + academicRankId + " not found for year: " + semester.getSemesterYear()));
    }

    public AcademicRankDetailsResponse findById(Integer academicRankDetailsId) {
        return academicRankDetailsRepo.findById(academicRankDetailsId)
                .map(academicRankDetailsMapper::toAcademicRankDetailsResponse)
                .orElseThrow(() -> new RuntimeException("Academic Rank with id " + academicRankDetailsId + " not found."));
    }

    public List<AcademicRankDetailsResponse> findAllAcademicRank() {
        List<AcademicRankDetails> academicRanks = (List<AcademicRankDetails>) academicRankDetailsRepo.findAll();
        return academicRanks.stream()
                .map(academicRankDetailsMapper::toAcademicRankDetailsResponse)
                .toList();
    }
}
