package workloadmanagement.course;
import org.springframework.stereotype.Service;
@Service
public class CourseMapper {
    public Course toCourse(CourseRequest request) {
        return Course.builder()
                .courseCode(request.courseCode())
                .courseName(request.courseName())
                .creditPoints(request.creditPoints())
                .necessaryRank(request.necessaryRankId())
                .registrationType(request.registrationType())
                .studyLevel(request.studyLevel())
                .section(request.section())
                .build();
    }
    public CourseResponse toCourseResponse(Course course){
        return CourseResponse.builder()
                .courseId(course.getCourseId())
                .courseCode(course.getCourseCode())
                .courseName(course.getCourseName())
                .creditPoints(course.getCreditPoints())
                .necessaryRankId(course.getNecessaryRank())
                .registrationType(course.getRegistrationType())
                .studyLevel(course.getStudyLevel())
                .section(course.getSection())
                .build();
    }
}
