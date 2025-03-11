package workloadmanagement.MyClass;

import jakarta.validation.Valid;
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
        Faculty faculty = facultyService.findFacultyFromResponseId(request.classFacultyId());
        MyClass myClass = MyClassMapper.toMyClass(request, faculty);
        return myClassRepo.save(myClass).getClassId();
    }
    public Integer update(Integer myclassId, @Valid MyClassRequest request) {
        MyClass existingMyClass = findMyClassFromResponseId(myclassId);
        Faculty faculty = facultyService.findFacultyFromResponseId(request.classFacultyId());
        MyClass updatedMyClass = MyClassMapper.toMyClass(request, faculty);
        updatedMyClass.setClassId(existingMyClass.getClassId());
        return myClassRepo.save(updatedMyClass).getClassId();
    }
    public MyClass findMyClassFromResponseId(int id) {
        return myClassRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("MyClass with id: " + id + " not found."));
    }
    public MyClassResponse findById(Integer myClassId) {
        return myClassRepo.findById(myClassId)
                .map(MyClassMapper::toMyClassResponse)
                .orElseThrow(() -> new RuntimeException("MyClass not found"));
    }

    public List<MyClassResponse> findAllMyClass() {
        List<MyClass> myClass = myClassRepo.findByIsDeletedFalse();
        return myClass.stream()
                .map(MyClassMapper::toMyClassResponse)
                .toList();
    }


    public Integer delete(Integer myClassId) {
        MyClass myClass = findMyClassFromResponseId(myClassId);
        myClass.setDeleted(true);
        myClassRepo.save(myClass);
        return myClassId;
    }
}
