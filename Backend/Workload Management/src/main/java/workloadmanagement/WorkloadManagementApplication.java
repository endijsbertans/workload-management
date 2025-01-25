package workloadmanagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import workloadmanagement.model.MyAuthority;
import workloadmanagement.model.MyUser;
import workloadmanagement.repo.IMyAuthorityRepo;
import workloadmanagement.repo.IMyUserRepo;

@SpringBootApplication
public class WorkloadManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorkloadManagementApplication.class, args);
	}
	@Bean
	public CommandLineRunner testDatabaseLayer(
			IMyAuthorityRepo authRepo, IMyUserRepo userRepo
	){
	return new CommandLineRunner() {
		@Override
		public void run(String... args) throws Exception {
			MyAuthority a1 = new MyAuthority("DOCENTS");
			authRepo.save(a1);
			PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
			MyUser u1 = new MyUser("Karli","Lauva", "Docents", encoder.encode("123"), a1);
			userRepo.save(u1);
			a1.addUser(u1);
			authRepo.save(a1);
			System.out.println("All users: " + userRepo.findAll());
			System.out.println("All Auths: " + authRepo.findAll());
		}
	};
	}
}
