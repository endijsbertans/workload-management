package workloadmanagement.course;
import org.springframework.stereotype.Service;
import workloadmanagement.academicrank.AcademicRank;

@Service
public class CourseMapper {
    public Course toCourse(CourseRequest request, AcademicRank necessaryRank) {
        return Course.builder()
                .courseCode(request.courseCode())
                .courseName(request.courseName())
                .creditPoints(request.creditPoints())
                .necessaryRank(necessaryRank)
                .registrationType(request.registrationType())
                .studyLevel(request.studyLevel())
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
                .necessaryAcademicRank(course.getNecessaryRank())
                .registrationType(course.getRegistrationType())
                .studyLevel(course.getStudyLevel())
                .section(course.getSection())
                .isDeleted(course.isDeleted())
                .build();
    }
}
