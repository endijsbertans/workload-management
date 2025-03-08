package workloadmanagement;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetails;
import workloadmanagement.academicrank.academicrankDetails.IAcademicRankDetailsRepo;
import workloadmanagement.semester.Semester;
import workloadmanagement.semester.SemesterEnum;
import workloadmanagement.auth.security.MyAuthority;
import workloadmanagement.auth.security.MyUser;
import workloadmanagement.course.Course;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.repo.*;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.teachingstaff.TeachingStaff;
import workloadmanagement.workload.Workload;

import java.time.LocalDate;
import java.util.List;

@EnableJpaAuditing()
@SpringBootApplication
@EnableAsync
public class WorkloadManagementApplication {
	public static void main(String[] args) {
		SpringApplication.run(WorkloadManagementApplication.class, args);
	}

	@Bean
	public CommandLineRunner testDatabaseLayer(
			IMyAuthorityRepo myAuthorityRepo,
			IMyUserRepo userRepo,
			IAcademicRankRepo academicRankRepo,
			IFacultyRepo facultyRepo,
			IMyClassRepo myClassRepo,
			ICourseRepo courseRepo,
			IStatusTypeRepo statusTypeRepo,
			ITeachingStaffRepo teachingStaffRepo,
			IWorkloadRepo workloadRepo,
			ISemesterRepo semesterRepo,
			IAcademicRankDetailsRepo academicRankDetailsRepo ,
			PasswordEncoder passwordEncoder

	) {
		return args -> {
			if (myAuthorityRepo.findByTitle("USER").isEmpty()) {
//				myAuthorityRepo.save(MyAuthority.builder().title("USER").build());
			}
					var authorities = myAuthorityRepo.save(MyAuthority.builder().title("USER").build());

					MyUser u1 = MyUser.builder()
							.email("endijsbertans@gmail.com")
							.password(passwordEncoder.encode("123456789"))
							.accountLocked(false)
							.enabled(true)
							.authorities((List.of(authorities)))
							.build();
					userRepo.save(u1);
					myAuthorityRepo.save(authorities);
					Semester s1 = Semester.builder()
							.semesterName(SemesterEnum.pavasaris)
							.semesterYear(2024)
							.build();
					semesterRepo.save(s1);

					AcademicRank ar1 = AcademicRank.builder()
							.rankName("Profesori")
							.abbreviation("prof.")
							.build();
					AcademicRank ar2 = AcademicRank.builder()
							.rankName("Asociētie profesori")
							.abbreviation("asoc.prof")
							.build();
					AcademicRank ar3 = AcademicRank.builder()
							.rankName("Docenti")
							.abbreviation("doc.")
							.build();
					AcademicRank ar4 = AcademicRank.builder()
							.rankName("lektori")
							.abbreviation("lekt.")
							.build();
					academicRankRepo.save(ar1);
					academicRankRepo.save(ar2);
					academicRankRepo.save(ar3);
					academicRankRepo.save(ar4);

					AcademicRankDetails ard1 = AcademicRankDetails.builder()
							.academicRank(ar1)
							.cpForFullTime(9.58)
							.salary(2712)
							.contactHoursForFullTime(14.37)
							.semester(s1)
							.build();
				AcademicRankDetails ard2 = AcademicRankDetails.builder()
						.academicRank(ar2)
						.cpForFullTime(12.31)
						.salary(2171)
						.contactHoursForFullTime(18.465)
						.semester(s1)
						.build();
				AcademicRankDetails ard3 = AcademicRankDetails.builder()
						.academicRank(ar3)
						.cpForFullTime(15.05)
						.salary(1738)
						.contactHoursForFullTime(24.63)
						.semester(s1)
						.build();
				AcademicRankDetails ard4 = AcademicRankDetails.builder()
						.academicRank(ar4)
						.cpForFullTime(16.42)
						.salary(1392)
						.contactHoursForFullTime(24.63)
						.semester(s1)
						.build();
				academicRankDetailsRepo.save(ard1);
				academicRankDetailsRepo.save(ard2);
				academicRankDetailsRepo.save(ard3);
				academicRankDetailsRepo.save(ard4);
					Faculty f1 =  Faculty.builder()
							.facultyName("ITF")
							.facultyFullName("Informācijas tehnoloģiju fakultāte")
							.build();
					facultyRepo.save(f1);

					MyClass ac1 = MyClass.builder()
							.className("3EIB")
							.classFaculty(f1)
							.myClassProgram("EIB")
							.build();
					myClassRepo.save(ac1);
					MyClass ac2 = MyClass.builder()
							.className("1ITB")
							.myClassProgram("ITB")
							.classFaculty(f1)
							.build();
					myClassRepo.save(ac2);

					Course c1 =  Course.builder()
							.courseCode("MateB008")
							.courseName("Algoritmu teorija")
							.necessaryRank(ar1)
							.studyLevel(2)
							.registrationType("automātiska")
							.section("Nozares pamatnoz")
							.creditPoints(3.0)
							.build();
					courseRepo.save(c1);

					StatusType st1 = StatusType.builder()
							.statusTypeName("ievēlētie")
							.build();
					statusTypeRepo.save(st1);


					TeachingStaff ts1 = TeachingStaff.builder()
							.user(u1)
							.name("Endijs")
							.surname("Bertāns")
							.positionTitle("doc")
							.status(st1)
							.staffFaculty(f1)
							.staffAcademicRank(ar1)
							.build();
					teachingStaffRepo.save(ts1);

					Workload w1 = Workload.builder()
									.teachingStaff(ts1)
									.semester(s1)
									.comments("praktiskie darbi")
									.includeInBudget("1")
									.budgetPosition(false)
									.industryCoefficient(1)
									.vacationMonths(0)
									.workingMonths(5)
									.expectedSalary(577)
									.groupAmount(1)
									.contactHours(1)
									.program(true)
									.groupForSemester(ac1)
									.course(c1)
									.academicRankDetails(ard1)
									.myClasses(List.of(ac1,ac2))
									.programCoefficient(0.75)
									.program(true)
									.creditPointsPerGroup(2)
									.totalCreditPoints(3)
									.build();
					workloadRepo.save(w1);
					myClassRepo.save(ac1);
					System.out.println(w1);

			};
		}
	}

