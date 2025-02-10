package workloadmanagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import workloadmanagement.MyClass.MyClass;
import workloadmanagement.academicrank.AcademicRank;
import workloadmanagement.auth.security.MyAuthority;
import workloadmanagement.auth.security.MyUser;
import workloadmanagement.course.Course;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.repo.*;
import workloadmanagement.statustype.StatusType;
import workloadmanagement.teachingstaff.TeachingStaff;
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
			PasswordEncoder passwordEncoder
	) {
		return args -> {
//			if (myAuthorityRepo.findByTitle("USER").isEmpty()) {
//				//myAuthorityRepo.save(MyAuthority.builder().title("USER").build());
//			}
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
					AcademicRank ar1 = AcademicRank.builder()
							.rankName("Profesori")
							.cpForSpring(9.580)
							.cpForAutumn(14.370)
							.abbreviation("prof.")
							.salary(2712)
							.build();

					AcademicRank ar2 = AcademicRank.builder()
							.rankName("Asociētie profesori")
							.cpForSpring(12.310)
							.cpForAutumn(18.465)
							.abbreviation("asoc.prof")
							.salary(2172)
							.build();
					academicRankRepo.save(ar1);
					academicRankRepo.save(ar2);

					Faculty f1 =  Faculty.builder()
							.facultyName("ITF")
							.facultyFullName("Informācijas tehnoloģiju fakultāte")
							.build();
					facultyRepo.save(f1);

					MyClass ac1 = MyClass.builder()
							.className("3EIB")
							.classFaculty(f1)
							.studentAmount(22)
							.classYear("s22")
							.build();
					myClassRepo.save(ac1);
					MyClass ac2 = MyClass.builder()
							.className("1ITB")
							.classFaculty(f1)
							.studentAmount(27)
							.classYear("s21")
							.build();
					myClassRepo.save(ac2);

					Course c1 =  Course.builder()
							.courseCode("MateB008")
							.courseName("Algoritmu teorija")
							.necessaryRank(ar1)
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
							.staffFaculty(f1)
							.staffAcademicRank(ar1)
							.build();
					teachingStaffRepo.save(ts1);

					Workload w1 = Workload.builder()
									.teachingStaff(ts1)
									.statusType(st1)
									.semester("rudens")
									.comments("praktiskie darbi")
									.includeInBudget("1")
									.budgetPosition(false)
									.industryCoefficient(1)
									.vacationMonths(0)
									.workingMonths(5)
									.expectedSalary(577)
									.groupAmount(1)
									.contactHours(1)
									.program("ITB")
									.groupForSemester("1ITB")
									.course(c1)
									.academicRank(ar1)
									.myClasses(List.of(ac1,ac2))
									.build();
					workloadRepo.save(w1);
					myClassRepo.save(ac1);
					System.out.println(w1);


			};
		}
	}
