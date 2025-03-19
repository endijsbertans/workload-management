package workloadmanagement.course;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.AcademicRankService;
import workloadmanagement.repo.ICourseRepo;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseMapper courseMapper;
    private final ICourseRepo courseRepo;
    private final AcademicRankService academicRankService;
    public Integer save(CourseRequest request) {
        Course course = courseMapper.toCourse(request);
        return courseRepo.save(course).getCourseId();
    }
    public Integer update(Integer courseId, @Valid CourseRequest request) {
        Course existingCourse = findCourseFromResponseId(courseId);
        Course updatedCourse = courseMapper.toCourse(request);
        updatedCourse.setCourseId(existingCourse.getCourseId());
        return courseRepo.save(updatedCourse).getCourseId();
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
        List<Course> courses = courseRepo.findByIsDeletedFalse();
        return courses.stream()
                .map(courseMapper::toCourseResponse)
                .toList();
    }


    public Integer delete(Integer courseId) {
        Course course = findCourseFromResponseId(courseId);
        course.setDeleted(true);
        courseRepo.save(course);
        return courseId;
    }

    public Integer uploadCourse(MultipartFile file) throws IOException {
        Set<Course> courses = parseCsv(file);
        courseRepo.saveAll(courses);
        return courses.size();
    }

    private Set<Course> parseCsv(MultipartFile file) throws IOException {
        try(Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))){
            HeaderColumnNameMappingStrategy<CourseCsvRepresentation> strategy = new HeaderColumnNameMappingStrategy<>();
            strategy.setType(CourseCsvRepresentation.class);
            CsvToBean<CourseCsvRepresentation> csvToBean =
                    new CsvToBeanBuilder<CourseCsvRepresentation>(reader)
                            .withMappingStrategy(strategy)
                            .withIgnoreEmptyLine(true)
                            .withIgnoreLeadingWhiteSpace(true)
                            .withSeparator(';')
                            .build();
             return csvToBean.parse()
                    .stream()
                    .map(csvLine -> Course.builder()
                            .courseCode(csvLine.getCourseCode())
                            .courseName(csvLine.getCourseName())
                            .creditPoints(csvLine.getCreditPoints())
                            .registrationType(csvLine.getRegistrationType())
                            .section(csvLine.getSection())
                            .isDeleted(false)
                            .build())
                    .collect(Collectors.toSet());
        }
    }

    public byte[] generateCsvTemplate() {
        StringBuilder csvContent = new StringBuilder();
        csvContent.append("courseCode;courseName;creditPoints;registrationType;section\n");
        csvContent.append("# Piemers zemak, pirms publicesanas izdzest visu kas sakas ar #, ka ari pasu piemeru\n");
        csvContent.append("LAIS123;Matematika;2;Automatiska;Pamatnozare\n");
        return csvContent.toString().getBytes();
    }
}
