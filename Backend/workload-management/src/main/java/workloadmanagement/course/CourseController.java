package workloadmanagement.course;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.faculty.FacultyRequest;

import java.util.List;
@RestController
@RequestMapping("course")
@RequiredArgsConstructor
@Tag(name = "Course")
public class CourseController {
    private final CourseService courseService;
    @PostMapping
    public ResponseEntity<Integer> saveCourse(
            @Valid @RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.save(request));
    }
    @PatchMapping("{courseId}")
    public ResponseEntity<Integer> updateCourseById(
            @PathVariable Integer courseId,
            @Valid @RequestBody CourseRequest request
    ){
        return ResponseEntity.ok(courseService.update(courseId, request));
    }
    @DeleteMapping("{courseId}")
    public ResponseEntity<Integer> deleteCourseById(
            @PathVariable Integer courseId
    ){
        return ResponseEntity.ok(courseService.delete(courseId));
    }
    @GetMapping("{courseId}")
    public ResponseEntity<CourseResponse> findCourseById(
            @PathVariable Integer courseId) {
        return ResponseEntity.ok(courseService.findById(courseId));
    }
    @GetMapping
    public ResponseEntity<List<CourseResponse>> findAllCourses() {
        return ResponseEntity.ok(courseService.findAllCourses());
    }
}
