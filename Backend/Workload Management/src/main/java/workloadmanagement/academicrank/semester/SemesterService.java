package workloadmanagement.academicrank.semester;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.ISemesterRepo;

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
        List<Semester> semesters = (List<Semester>) semesterRepo.findAll();
        return semesters.stream()
                .map(semesterMapper::toSemesterResponse)
                .toList();
    }
}
