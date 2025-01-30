package workloadmanagement.MyClass;

import org.springframework.stereotype.Service;

@Service
public class MyClassMapper {

    public MyClass toMyClass(MyClassRequest request){
        return MyClass.builder()
                .className(request.className())
                .studentAmount(request.studentAmount())
                .classFaculty(request.classFaculty())
                .classYear(request.classYear())
                .build();
    }

    public MyClassResponse toMyClassResponse(MyClass myClass){
        return MyClassResponse.builder()
                .classId(myClass.getClassId())
                .className(myClass.getClassName())
                .studentAmount(myClass.getStudentAmount())
                .classFaculty(myClass.getClassFaculty())
                .classYear(myClass.getClassYear())
                .build();
    }
}
