package workloadmanagement.myclass;

import com.opencsv.bean.CsvBindByName;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyClassCsvRepresentation {
    @CsvBindByName(column="classLevel")
    int classLevel;
    @CsvBindByName(column="classFacultyId")
    int classFacultyId;
    @CsvBindByName(column="myClassProgram")
    String myClassProgram;
    @CsvBindByName(column="degree")
    Degree degree;
}
