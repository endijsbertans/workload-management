package workloadmanagement.faculty;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.IFacultyRepo;


import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyService {
    private final FacultyMapper facultyMapper;
    private final IFacultyRepo facultyRepo;
    public Integer save(FacultyRequest request) {
        Faculty faculty = facultyMapper.toFaculty(request);
        return facultyRepo.save(faculty).getFacultyId();
    }

    public FacultyResponse findFacultyById(Integer facultyId) {
        return facultyRepo.findById(facultyId)
                .map(facultyMapper::toFacultyResponse)
                .orElseThrow(() -> new RuntimeException("Faculty with id: " + facultyId + " not found."));
    }
    public Faculty findFacultyFromResponseId(int id) {
        return facultyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Faculty with id: " + id + " not found."));
    }
    public List<FacultyResponse> findAllFaculties() {
        List<Faculty> faculties = (List<Faculty>) facultyRepo.findAll();
        return faculties.stream()
                .map(facultyMapper::toFacultyResponse)
                .toList();
    }
}
