package workloadmanagement.config.course;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.ICourseRepo;


import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseMapper courseMapper;
    private final ICourseRepo courseRepo;
    public Integer save(CourseRequest request) {
        Course course = courseMapper.toCourse(request);
        return courseRepo.save(course).getCourseId();
    }
    public CourseResponse findById(Integer courseId) {
        return courseRepo.findById(courseId)
                .map(courseMapper::toCourseResponse)
                .orElseThrow(() -> new RuntimeException("Course with id " + courseId + " not found"));
    }
    public List<CourseResponse> findAllCourses() {
        List<Course> courses = (List<Course>) courseRepo.findAll();
        return courses.stream()
                .map(courseMapper::toCourseResponse)
                .toList();
    }
}
