package workloadmanagement.academicrank.academicrankDetails;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.AcademicRankService;
import workloadmanagement.semester.Semester;
import workloadmanagement.semester.SemesterService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicRankDetailsService {
    private final AcademicRankDetailsMapper academicRankDetailsMapper;
    private final IAcademicRankDetailsRepo academicRankDetailsRepo;
    private final AcademicRankService academicRankService;
    private final SemesterService semesterService;
    public Integer save(AcademicRankDetailsRequest request) {
        AcademicRankDetailsEntities entities = resolveEntities(request);
        AcademicRankDetails academicRankDetails = academicRankDetailsMapper.toAcademicRankDetails(request, entities);
        return academicRankDetailsRepo.save(academicRankDetails).getAcademicRankDetailsId();
    }
    public Integer update(Integer academicRankDetailsId, @Valid AcademicRankDetailsRequest request) {
        AcademicRankDetailsEntities entities = resolveEntities(request);
        AcademicRankDetails existingAcademicRankDetails = findExistingAcademicRankDetailsById(academicRankDetailsId);
        AcademicRankDetails updatedAcademicRankDetails = academicRankDetailsMapper.toAcademicRankDetails(request, entities);
        updatedAcademicRankDetails.setAcademicRankDetailsId(existingAcademicRankDetails.getAcademicRankDetailsId());
        return academicRankDetailsRepo.save(updatedAcademicRankDetails).getAcademicRankDetailsId();
    }
    public AcademicRankDetails findAcademicRankDetailsFromResponseId(int academicRankId, Semester semester) {
        return academicRankDetailsRepo.findByAcademicRank_AcademicRankIdAndSemester_SemesterYear(academicRankId, semester.getSemesterYear())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Academic Rank with ID: " + academicRankId + " not found for year: " + semester.getSemesterYear()));
    }
    public AcademicRankDetails findExistingAcademicRankDetailsById(Integer academicRankDetailsId) {
        return academicRankDetailsRepo.findById(academicRankDetailsId)
                .orElseThrow(() -> new RuntimeException("Academic Rank with id " + academicRankDetailsId + " not found."));
    }
    public AcademicRankDetailsResponse findAcademicRankDetailsById(Integer academicRankDetailsId) {
        return academicRankDetailsRepo.findById(academicRankDetailsId)
                .map(academicRankDetailsMapper::toAcademicRankDetailsResponse)
                .orElseThrow(() -> new RuntimeException("Academic Rank with id " + academicRankDetailsId + " not found."));
    }

    public List<AcademicRankDetailsResponse> findAllAcademicRankDetails() {
        List<AcademicRankDetails> academicRanks = academicRankDetailsRepo.findByIsDeletedFalse();
        return academicRanks.stream()
                .map(academicRankDetailsMapper::toAcademicRankDetailsResponse)
                .toList();
    }
    public Integer delete(Integer academicRankDetailsId) {
        AcademicRankDetails academicRankDetails = findExistingAcademicRankDetailsById(academicRankDetailsId);
        academicRankDetails.setDeleted(true);
        academicRankDetailsRepo.save(academicRankDetails);
        return academicRankDetailsId;
    }
    // gets objects from database using their response ids
    private AcademicRankDetailsEntities resolveEntities(AcademicRankDetailsRequest request) {
        AcademicRank academicRank = academicRankService.findAcademicRankFromResponseId(request.academicRankId());
        Semester semester = semesterService.findSemesterFromResponseId(request.semesterId());
        return new AcademicRankDetailsEntities(academicRank, semester);
    }

    public record AcademicRankDetailsEntities(
            AcademicRank academicRank,
            Semester semester

    ) {}

}
