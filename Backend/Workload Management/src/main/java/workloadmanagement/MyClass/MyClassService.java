package workloadmanagement.MyClass;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.IMyClassRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyClassService {
    private final MyClassMapper MyClassMapper;
    private final IMyClassRepo myClassRepo;

    public Integer save(MyClassRequest request) {
        MyClass myClass = MyClassMapper.toMyClass(request);
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
