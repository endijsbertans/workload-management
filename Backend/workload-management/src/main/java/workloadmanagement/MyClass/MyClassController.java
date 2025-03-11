package workloadmanagement.MyClass;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.semester.SemesterRequest;

import java.util.List;

@RestController
@RequestMapping("my-class")
@RequiredArgsConstructor
@Tag(name = "MyClass")
public class MyClassController {
    private final MyClassService myClassService;

    @PostMapping
    public ResponseEntity<Integer> saveMyClass(
            @Valid @RequestBody MyClassRequest request
    ){
        return ResponseEntity.ok(myClassService.save(request));
    }
    @PatchMapping("{myClassId}")
    public ResponseEntity<Integer> updateMyClass(
            @PathVariable("myClassId") Integer myClassId,
            @Valid @RequestBody MyClassRequest request
    ){
        return ResponseEntity.ok(myClassService.update(myClassId, request));
    }
    @GetMapping("{myClassId}")
    public ResponseEntity<MyClassResponse> findMyClassById(
            @PathVariable("myClassId") Integer myClassId
    ){
        return ResponseEntity.ok(myClassService.findById(myClassId));
    }
    @DeleteMapping("{myClassId}")
    public ResponseEntity<Integer> deleteMyClassById(
            @PathVariable Integer myClassId
    ){
        return ResponseEntity.ok(myClassService.delete(myClassId));
    }
    @GetMapping
    public ResponseEntity<List<MyClassResponse>> findAllMyClass(){
        return ResponseEntity.ok(myClassService.findAllMyClass());
    }
    @GetMapping("/getDegreeEnums")
    public ResponseEntity<Degree[]> getEnums() {
        return ResponseEntity.ok(Degree.values());
    }
}
