package workloadmanagement.course;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import workloadmanagement.faculty.FacultyRequest;

import java.io.IOException;
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
    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<Integer> uploadCourse(
            @RequestPart("file") MultipartFile file
    ) throws IOException {
        return ResponseEntity.ok(courseService.uploadCourse(file));
    }
    @GetMapping(value = "/template", produces = "text/csv")
    public ResponseEntity<ByteArrayResource> getCourseCSVTemplate(){
        String filename = "course_import_template.csv";
        ByteArrayResource resource = new ByteArrayResource(courseService.generateCsvTemplate());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(resource);
    }
}
