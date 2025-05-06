package workloadmanagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import workloadmanagement.academicrank.IAcademicRankRepo;
import workloadmanagement.auth.security.authority.IMyAuthorityRepo;
import workloadmanagement.auth.security.user.IMyUserRepo;
import workloadmanagement.course.ICourseRepo;
import workloadmanagement.faculty.IFacultyRepo;
import workloadmanagement.myclass.Degree;
import workloadmanagement.myclass.IMyClassRepo;
import workloadmanagement.myclass.MyClass;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.academicrank.academicrankDetails.AcademicRankDetails;
import workloadmanagement.academicrank.academicrankDetails.IAcademicRankDetailsRepo;
import workloadmanagement.semester.ISemesterRepo;
import workloadmanagement.semester.Semester;
import workloadmanagement.semester.SemesterEnum;
import workloadmanagement.auth.security.authority.MyAuthority;
import workloadmanagement.auth.security.user.MyUser;
import workloadmanagement.course.Course;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.statustype.IStatusTypeRepo;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.teachingstaff.ITeachingStaffRepo;
import workloadmanagement.teachingstaff.TeachingStaff;
import workloadmanagement.workload.BudgetPositions;
import workloadmanagement.workload.IWorkloadRepo;
import workloadmanagement.workload.Workload;

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
					var authorities = myAuthorityRepo.save(MyAuthority.builder().title("ROLE_TEACHINGSTAFF").build());
					var authorities2 = myAuthorityRepo.save(MyAuthority.builder().title("ROLE_ADMIN").build());
					var authorities3 = myAuthorityRepo.save(MyAuthority.builder().title("ROLE_DIRECTOR").build());
					MyUser u1 = MyUser.builder()
							.email("endijsbertans@gmail.com")
							.password(passwordEncoder.encode("123456789"))
							.accountLocked(false)
							.enabled(true)
							.authorities((List.of(authorities)))
							.build();
					userRepo.save(u1);
					myAuthorityRepo.save(authorities);
					MyUser u2 = MyUser.builder()
							.email("bertansendijs@gmail.com")
							.password(passwordEncoder.encode("123456789"))
							.accountLocked(false)
							.enabled(true)
							.authorities((List.of(authorities2)))
							.build();
					userRepo.save(u2);
					myAuthorityRepo.save(authorities2);
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
							.classLevel(3)
							.classFaculty(f1)
							.classProgram("EIB")
							.degree(Degree.BACHELOR)
							.build();
					myClassRepo.save(ac1);
					MyClass ac2 = MyClass.builder()
							.classLevel(1)
							.classProgram("ITB")
							.classFaculty(f1)
							.build();
					myClassRepo.save(ac2);

					Course c1 =  Course.builder()
							.courseCode("MateB008")
							.courseName("Algoritmu teorija")
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
					TeachingStaff ts2 = TeachingStaff.builder()
							.user(u2)
							.name("Janis")
							.surname("Berzins")
							.positionTitle("doc")
							.status(st1)
							.staffFaculty(f1)
							.staffAcademicRank(ar1)
							.build();
					teachingStaffRepo.save(ts2);

					Workload w1 = Workload.builder()
									.teachingStaff(ts1)
									.semester(s1)
									.comments("praktiskie darbi")
									.includeInBudget("1")
									.budgetPosition(BudgetPositions.ZB)
									.industryCoefficient(1)
									.vacationMonths(0)
									.workingMonths(5)
									.expectedSalary(577)
									.groupAmount(1)
									.contactHours(1)
									.groupForSemester(ac1)
									.course(c1)
									.academicRankDetails(ard1)
									.myClasses(List.of(ac1,ac2))
									.programCoefficient(0.75)
									.creditPointsPerGroup(2)
									.totalCreditPoints(3)
									.build();
					workloadRepo.save(w1);
					myClassRepo.save(ac1);
					System.out.println(w1);

			};
		}
	}

