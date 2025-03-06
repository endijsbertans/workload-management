package workloadmanagement.academicrank.academicrankDetails;

import jakarta.persistence.EntityNotFoundException;
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
        Semester semester = semesterService.findSemesterFromResponseId(request.semesterId());
        AcademicRank staffAcademicRank = academicRankService.findAcademicRankFromResponseId(request.academicRankId());
        AcademicRankDetails academicRankDetails = academicRankDetailsMapper.toAcademicRankDetails(request, staffAcademicRank, semester);
        return academicRankDetailsRepo.save(academicRankDetails).getAcademicRankDetailsId();
    }

    public AcademicRankDetails findAcademicRankDetailsFromResponseId(int academicRankId, Semester semester) {
        return academicRankDetailsRepo.findByAcademicRank_AcademicRankIdAndSemester_SemesterYear(academicRankId, semester.getSemesterYear())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Academic Rank with ID: " + academicRankId + " not found for year: " + semester.getSemesterYear()));
    }

    public AcademicRankDetailsResponse findAcademicRankDetailsById(Integer academicRankDetailsId) {
        return academicRankDetailsRepo.findById(academicRankDetailsId)
                .map(academicRankDetailsMapper::toAcademicRankDetailsResponse)
                .orElseThrow(() -> new RuntimeException("Academic Rank with id " + academicRankDetailsId + " not found."));
    }

    public List<AcademicRankDetailsResponse> findAllAcademicRankDetails() {
        List<AcademicRankDetails> academicRanks = (List<AcademicRankDetails>) academicRankDetailsRepo.findAll();
        return academicRanks.stream()
                .map(academicRankDetailsMapper::toAcademicRankDetailsResponse)
                .toList();
    }
}
