package workloadmanagement.course;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.AcademicRankService;
import workloadmanagement.repo.ICourseRepo;


import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseMapper courseMapper;
    private final ICourseRepo courseRepo;
    private final AcademicRankService academicRankService;
    public Integer save(CourseRequest request) {
        AcademicRank necessaryAcademicRank = academicRankService.findAcademicRankFromResponseId(request.necessaryAcademicRankId());
        Course course = courseMapper.toCourse(request, necessaryAcademicRank);
        return courseRepo.save(course).getCourseId();
    }
    public Course findCourseFromResponseId(int id) {
        return courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course with id: " + id + " not found."));
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
