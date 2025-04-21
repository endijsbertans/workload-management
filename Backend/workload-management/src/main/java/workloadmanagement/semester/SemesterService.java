package workloadmanagement.semester;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.ISemesterRepo;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class SemesterService {
    private final SemesterMapper semesterMapper;
    private final ISemesterRepo semesterRepo;

    public Integer save(SemesterRequest request) {
        Semester semester = semesterMapper.toSemester(request);
        return semesterRepo.save(semester).getSemesterId();
    }
    public Integer update(Integer semesterId, @Valid SemesterRequest request) {
        Semester existingSemester = findSemesterFromResponseId(semesterId);
        Semester updatedSemester = semesterMapper.toSemester(request);

        updatedSemester.setSemesterId(existingSemester.getSemesterId());

        return semesterRepo.save(updatedSemester).getSemesterId();
    }

    public Semester findSemesterFromResponseId(int id) {
        return semesterRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Semester with id: " + id + " not found."));
    }
    public SemesterResponse findById(Integer statusTypeId) {
        return semesterRepo.findById(statusTypeId)
                .map(semesterMapper::toSemesterResponse)
                .orElseThrow(()-> new EntityNotFoundException("Semester with id: " + statusTypeId + " not found"));
    }
    public List<SemesterResponse> findAllStatusTypes() {
        List<Semester> semesters = semesterRepo.findByIsDeletedFalseOrderBySemesterYearDesc();
        return semesters.stream()
                .map(semesterMapper::toSemesterResponse)
                .toList();
    }

    public Integer delete(Integer semesterId) {
        Semester semester = findSemesterFromResponseId(semesterId);
        semester.setDeleted(true);
        semesterRepo.save(semester);
        return semesterId;
    }


    public Optional<Semester> findPreviousYearSemester(Semester currentSemester) {
        int previousYear = currentSemester.getSemesterYear() - 1;
        return semesterRepo.findBySemesterYearAndSemesterName(previousYear, currentSemester.getSemesterName());
    }


    public List<Semester> findSemestersByYear(int year) {
        return semesterRepo.findBySemesterYearAndIsDeletedFalse(year);
    }


    public Optional<Semester> findMostRecentSemester() {
        List<Semester> semesters = semesterRepo.findByIsDeletedFalseOrderBySemesterYearDesc();
        return semesters.isEmpty() ? Optional.empty() : Optional.of(semesters.get(0));
    }

    public Semester findCurrentOrLatestSemester() {
        int currentYear = java.time.LocalDate.now().getYear();
        SemesterEnum currentSemesterName = java.time.LocalDate.now().getMonthValue() >= 8 ?
                SemesterEnum.rudens : SemesterEnum.pavasaris;

        // Try to find current semester
        Optional<Semester> currentSemester = semesterRepo.findBySemesterYearAndSemesterName(currentYear, currentSemesterName);
        if (currentSemester.isPresent()) {
            return currentSemester.get();
        }

        // If not found, get the most recent semester
        return findMostRecentSemester()
                .orElseThrow(() -> new EntityNotFoundException("No semesters found in the system"));
    }
}
