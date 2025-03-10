package workloadmanagement.faculty;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.MyClass.MyClassRequest;

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
    @PatchMapping("{facultyId}")
    public ResponseEntity<Integer> updateFaculty(
            @PathVariable Integer facultyId,
            @Valid @RequestBody FacultyRequest request
    ){
        return ResponseEntity.ok(facultyService.update(facultyId, request));
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
