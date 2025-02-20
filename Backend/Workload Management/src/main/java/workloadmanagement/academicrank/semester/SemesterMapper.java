package workloadmanagement.academicrank.semester;

import org.springframework.stereotype.Service;

@Service
public class SemesterMapper {
    public Semester toSemester(SemesterRequest request){
        return Semester.builder()
                .semesterName(request.semesterName())
                .year(request.year())
                .build();
    }
    public SemesterResponse toSemesterResponse(Semester semester){
        return SemesterResponse.builder()
                .semesterId(semester.getSemesterId())
                .semesterName(semester.getSemesterName())
                .year(semester.getYear())
                .build();
    }
}
