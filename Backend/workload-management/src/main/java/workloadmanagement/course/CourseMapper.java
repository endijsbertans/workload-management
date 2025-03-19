package workloadmanagement.course;
import org.springframework.stereotype.Service;
import workloadmanagement.academicrank.AcademicRank;

@Service
public class CourseMapper {
    public Course toCourse(CourseRequest request) {
        return Course.builder()
                .courseCode(request.courseCode())
                .courseName(request.courseName())
                .creditPoints(request.creditPoints())
                .registrationType(request.registrationType())
                .section(request.section())
                .isDeleted(false)
                .build();
    }
    public CourseResponse toCourseResponse(Course course){
        return CourseResponse.builder()
                .courseId(course.getCourseId())
                .courseCode(course.getCourseCode())
                .courseName(course.getCourseName())
                .creditPoints(course.getCreditPoints())
                .registrationType(course.getRegistrationType())
                .section(course.getSection())
                .isDeleted(course.isDeleted())
                .build();
    }
}
