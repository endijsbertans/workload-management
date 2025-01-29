package workloadmanagement.faculty;

import org.springframework.stereotype.Service;

@Service
public class FacultyMapper {
    public Faculty toFaculty(FacultyRequest request){
        return Faculty.builder()
                .facultyName(request.facultyName())
                .faculty_full_name(request.faculty_full_name())
                .build();
    }
    public FacultyResponse toFacultyResponse(Faculty faculty){
        return FacultyResponse.builder()
                .facultyId(faculty.getFacultyId())
                .facultyName(faculty.getFacultyName())
                .faculty_full_name(faculty.getFaculty_full_name())
                .build();
    }
}
