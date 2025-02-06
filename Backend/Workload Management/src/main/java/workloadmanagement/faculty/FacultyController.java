package workloadmanagement.faculty;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("faculty")
@RequiredArgsConstructor
@Tag(name = "Faculty")
public class FacultyController {
    private final FacultyService facultyService;

    @PostMapping
    public ResponseEntity<Integer> saveFaculty(@RequestBody FacultyRequest request){
        return ResponseEntity.ok(facultyService.save(request));
    }
    @GetMapping("{facultyId}")
    public ResponseEntity<FacultyResponse> findFacultyById(
            @PathVariable Integer facultyId){
        return ResponseEntity.ok(facultyService.findFacultyById(facultyId));
    }
    @GetMapping
    public ResponseEntity<List<FacultyResponse>> findAllFaculties(){
        return ResponseEntity.ok(facultyService.findAllFaculties());
    }
}
