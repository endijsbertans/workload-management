package workloadmanagement.faculty;


import org.springframework.stereotype.Service;


@Service
public class FacultyMapper {
    public Faculty toFaculty(FacultyRequest request){
        return Faculty.builder()
                .facultyName(request.facultyName())
                .facultyFullName(request.facultyFullName())
                .isDeleted(false)
                .build();
    }
    public FacultyResponse toFacultyResponse(Faculty faculty){
        return FacultyResponse.builder()
                .facultyId(faculty.getFacultyId())
                .facultyName(faculty.getFacultyName())
                .facultyFullName(faculty.getFacultyFullName())
                .isDeleted(faculty.isDeleted())
                .build();
    }

}
