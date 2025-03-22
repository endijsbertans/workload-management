package workloadmanagement.semester;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.ISemesterRepo;
import workloadmanagement.statustype.StatusType;

import java.util.List;
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
        List<Semester> semesters = semesterRepo.findByIsDeletedFalse();
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
}
