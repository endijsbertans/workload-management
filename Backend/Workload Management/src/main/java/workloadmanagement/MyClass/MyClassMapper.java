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
                .className(request.className())
                .studentAmount(request.studentAmount())
                .studyYear(request.studyYear())
                .classFaculty(faculty)
                .classYear(request.classYear())
                .program(request.program())
                .build();
    }

    public MyClassResponse toMyClassResponse(MyClass myClass){
        return MyClassResponse.builder()
                .classId(myClass.getClassId())
                .className(myClass.getClassName())
                .studentAmount(myClass.getStudentAmount())
                .classFaculty(facultyMapper.toFacultyResponse(myClass.getClassFaculty()))
                .classYear(myClass.getClassYear())
                .program(myClass.getProgram())
                .classNameAndYear(myClass.getClassNameAndYear())
                .build();
    }
}
