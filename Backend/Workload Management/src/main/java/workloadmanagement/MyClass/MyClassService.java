package workloadmanagement.MyClass;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.faculty.FacultyService;
import workloadmanagement.repo.IMyClassRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyClassService {
    private final MyClassMapper MyClassMapper;
    private final IMyClassRepo myClassRepo;
    private final FacultyService facultyService;
    public Integer save(MyClassRequest request) {
        Faculty faculty = facultyService.findFacultyFromResponse(request.classFaculty());
        MyClass myClass = MyClassMapper.toMyClass(request, faculty);
        return myClassRepo.save(myClass).getClassId();
    }
    public MyClassResponse findById(Integer myClassId) {
        return myClassRepo.findById(myClassId)
                .map(MyClassMapper::toMyClassResponse)
                .orElseThrow(() -> new RuntimeException("MyClass not found"));
    }

    public List<MyClassResponse> findAllMyClass() {
        List<MyClass> myClass = (List<MyClass>) myClassRepo.findAll();
        return myClass.stream()
                .map(MyClassMapper::toMyClassResponse)
                .toList();
    }
}
