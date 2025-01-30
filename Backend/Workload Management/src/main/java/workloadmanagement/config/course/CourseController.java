package workloadmanagement.config.course;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("course")
@RequiredArgsConstructor
@Tag(name = "Course")
public class CourseController {
    private final CourseService courseService;
    @PostMapping
    public ResponseEntity<Integer> saveWorkload(
            @Valid @RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.save(request));
    }
    @GetMapping("{course-id}")
    public ResponseEntity<CourseResponse> findCourseById(
            @PathVariable("course-id") Integer courseId) {
        return ResponseEntity.ok(courseService.findById(courseId));
    }
    @GetMapping
    public ResponseEntity<List<CourseResponse>> findAllCourses() {
        return ResponseEntity.ok(courseService.findAllCourses());
    }
}
