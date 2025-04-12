package workloadmanagement.teachingstaff;

import com.opencsv.bean.CsvBindByName;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeachingStaffCsvRepresentation {
    @CsvBindByName(column="email")
    private String email;
    @CsvBindByName(column="role")
    private String role;
    @CsvBindByName(column="statusId")
    int statusId;
    @CsvBindByName(column="staffFacultyId")
    int staffFacultyId;
    @CsvBindByName(column="staffAcademicRankId")
    int staffAcademicRankId;
    @CsvBindByName(column="name")
    String name;
    @CsvBindByName(column="surname")
    String surname;
}
