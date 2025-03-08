package workloadmanagement.MyClass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.faculty.FacultyMapper;
import workloadmanagement.repo.IFacultyRepo;

@Service
public class MyClassMapper {
    @Autowired
    private FacultyMapper facultyMapper;

    public MyClass toMyClass(MyClassRequest request, Faculty faculty){
        return MyClass.builder()
                .classLevel(request.classLevel())
                .classFaculty(faculty)
                .myClassProgram(request.myClassProgram())
                .degree(request.degree())
                .build();
    }

    public MyClassResponse toMyClassResponse(MyClass myClass){
        return MyClassResponse.builder()
                .classId(myClass.getClassId())
                .classLevel(myClass.getClassLevel())
                .classFaculty(facultyMapper.toFacultyResponse(myClass.getClassFaculty()))
                .myClassProgram(myClass.getMyClassProgram())
                .classLevelAndProgram(myClass.classLevelAndProgram())
                .degree(myClass.getDegree())
                .build();
    }
}
