package workloadmanagement.faculty;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.IFacultyRepo;

@Service
public class FacultyMapper {
    public Faculty toFaculty(FacultyRequest request){
        return Faculty.builder()
                .facultyName(request.facultyName())
                .facultyFullName(request.facultyFullName())
                .build();
    }
    public FacultyResponse toFacultyResponse(Faculty faculty){
        return FacultyResponse.builder()
                .facultyId(faculty.getFacultyId())
                .facultyName(faculty.getFacultyName())
                .facultyFullName(faculty.getFacultyFullName())
                .build();
    }

}
