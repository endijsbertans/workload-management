package workloadmanagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import workloadmanagement.security.MyAuthority;
import workloadmanagement.repo.*;

@EnableJpaAuditing()
@SpringBootApplication
@EnableAsync
public class WorkloadManagementApplication {
//	@Value("${pass2}")
//	private String pass;


	public static void main(String[] args) {
		SpringApplication.run(WorkloadManagementApplication.class, args);
	}

	@Bean
	public CommandLineRunner testDatabaseLayer(
			IMyAuthorityRepo myAuthorityRepo
	){
		return args->{
			if(myAuthorityRepo.findByTitle("USER").isEmpty()){
				myAuthorityRepo.save(MyAuthority.builder().title("USER").build());
			}
		};
	}
//			IMyAuthorityRepo authRepo,
//			IMyUserRepo userRepo,
//			IAcademicRank academicRankRepo,
//			IFacultyRepo facultyRepo,
//			IMyClassRepo myClassRepo,
//			ICourseRepo courseRepo,
//			IStatusTypeRepo statusTypeRepo,
//			ITeachingStaff teachingStaffRepo,
//			IWorkload workloadRepo
//	)
//	{
//
//	return new CommandLineRunner() {
//		@Override
//		public void run(String... args) throws Exception {
//			MyAuthority a1 = new MyAuthority("DOCENTS");
//			authRepo.save(a1);
//
//			PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
//			MyUser u1 = new MyUser("Vairis", "Caune", "VCaune", encoder.encode(pass), a1);
//			userRepo.save(u1);
//			a1.addUser(u1);
//			authRepo.save(a1);
//			System.out.println("All users: " + userRepo.findAll());
//			System.out.println("All Auths: " + authRepo.findAll());
//			AcademicRank ar1 = new AcademicRank(
//					"Profesori",
//					BigDecimal.valueOf(9.580),
//					BigDecimal.valueOf(14.370),
//					"prof.",
//					BigDecimal.valueOf(2712));
//
//			AcademicRank ar2 = new AcademicRank(
//					"Asociētie profesori",
//					BigDecimal.valueOf(12.310),
//					BigDecimal.valueOf(18.465),
//					"asoc.prof",
//					BigDecimal.valueOf(2171.00));
//			AcademicRank ar3 = new AcademicRank(
//					"docenti",
//					BigDecimal.valueOf(15.050),
//					BigDecimal.valueOf(22.575),
//					"doc.",
//					BigDecimal.valueOf(1738.00));
//			AcademicRank ar4 = new AcademicRank(
//					"lektori",
//					BigDecimal.valueOf(16.420),
//					BigDecimal.valueOf(24.630),
//					"lekt.",
//					BigDecimal.valueOf(1392.00));
//			AcademicRank ar5 = new AcademicRank(
//					"asistenti",
//					BigDecimal.valueOf(16.420),
//					BigDecimal.valueOf(24.630),
//					"asist.",
//					BigDecimal.valueOf(1109.00));
//			academicRankRepo.save(ar1);
//			academicRankRepo.save(ar2);
//			academicRankRepo.save(ar3);
//			academicRankRepo.save(ar4);
//			academicRankRepo.save(ar5);
//			Faculty f1 = new Faculty("ITF", "Informācijas tehnoloģiju fakultāte");
//			Faculty f2 = new Faculty("TSF", "Tulkošanas studiju fakultāte");
//			Faculty f3 = new Faculty("EPF", "Ekonomikas un pārvaldības fakultāte");
//			Faculty f4 = new Faculty("VeA", "Ventspils Augstskola");
//			facultyRepo.save(f1);
//			facultyRepo.save(f2);
//			facultyRepo.save(f3);
//			facultyRepo.save(f4);
//			MyClass ac1 = new MyClass("3EIB", 3, 27, f1, "S22");
//			MyClass ac2 = new MyClass("1TIB", 1, 22, f1, "S22");
//			myClassRepo.save(ac1);
//			myClassRepo.save(ac2);
//			Course c1 = new Course("MateB008","Algoritmu teorija", BigDecimal.valueOf(3.0), ar3,"automātiska" , "Nozares pamatnoz");
//			courseRepo.save(c1);
//			StatusType st1 = new StatusType("ievēlētie");
//			StatusType st2 = new StatusType("neievēlētie");
//			StatusType st3 = new StatusType("autoratl. līg.");
//			StatusType st4 = new StatusType("projekts 8.2.2.");
//			statusTypeRepo.save(st1);
//			statusTypeRepo.save(st2);
//			statusTypeRepo.save(st3);
//			statusTypeRepo.save(st4);
//			TeachingStaff ts1 = new TeachingStaff(u1,"doc", f1, ar1);
//			teachingStaffRepo.save(ts1);
//			Workload w1 = new Workload(
//					ts1,
//					st1,
//					"rudens",
//					BigDecimal.valueOf(1.0),
//					BigDecimal.valueOf(1.5),
//					"praktiskie darbi",
//					"1",
//					false,
//					BigDecimal.valueOf(1),
//					BigDecimal.valueOf(115.482),
//					0,
//					5,
//					BigDecimal.valueOf(577.409),
//					1,
//					BigDecimal.valueOf(0.0664),
//					BigDecimal.valueOf(1.5),
//					"ITB",
//					"1ITB",
//					c1,
//					ar3,
//					ac1, ac2);
//			ac1.addWorkload(w1);
//			ac2.addWorkload(w1);
//			workloadRepo.save(w1);
//			myClassRepo.save(ac1);
//			myClassRepo.save(ac2);
//
//			Workload w2 = new Workload(
//					ts1,
//					st1,
//					"rudens",
//					BigDecimal.valueOf(1.0),
//					BigDecimal.valueOf(1.5),
//					"lekcijas",
//					"1",
//					false,
//					BigDecimal.valueOf(1),
//					BigDecimal.valueOf(115.482),
//					0,
//					5,
//					BigDecimal.valueOf(577.409),
//					1,
//					BigDecimal.valueOf(0.0664),
//					BigDecimal.valueOf(1.5),
//					"ITB",
//					"1ITB",
//					c1,
//					ar3,
//					ac1);
//			ac1.addWorkload(w2);
//			workloadRepo.save(w2);
//			myClassRepo.save(ac1);
//		}
//
//	};
//
//	}
}
