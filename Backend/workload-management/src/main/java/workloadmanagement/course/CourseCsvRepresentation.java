package workloadmanagement.course;

import com.opencsv.bean.CsvBindByName;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CourseCsvRepresentation {
    @CsvBindByName(column="courseCode")
    private String courseCode;
    @CsvBindByName(column="courseName")
    private String courseName;
    @CsvBindByName(column="creditPoints")
    private double creditPoints;
    @CsvBindByName(column="registrationType")
    private String registrationType;
    @CsvBindByName(column="section")
    private String section;
}
