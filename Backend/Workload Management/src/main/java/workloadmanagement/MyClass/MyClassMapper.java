package workloadmanagement.MyClass;

import org.springframework.stereotype.Service;

@Service
public class MyClassMapper {

    public MyClass toMyClass(MyClassRequest request){
        return MyClass.builder()
                .className(request.className())
                .studyYear(request.studyYear())
                .studentAmount(request.studentAmount())
                .classFacultyId(request.classFacultyId())
                .classYear(request.classYear())
                .build();
    }

    public MyClassResponse toMyClassResponse(MyClass myClass){
        return MyClassResponse.builder()
                .classId(myClass.getClassId())
                .className(myClass.getClassName())
                .studyYear(myClass.getStudyYear())
                .studentAmount(myClass.getStudentAmount())
                .classFacultyId(myClass.getClassFacultyId())
                .classYear(myClass.getClassYear())
                .build();
    }
}
