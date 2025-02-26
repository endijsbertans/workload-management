package workloadmanagement.academicrank.academicrankDetails;
import lombok.*;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.semester.Semester;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AcademicRankDetailsResponse {
    private int academicRankDetailsId;
    private double  cpForFullTime;
    private double salary;
    private double contactHoursForFullTime;
    private Semester semester;
    private AcademicRank academicRank;
}

