package workloadmanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import workloadmanagement.service.impl.MyUserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class MyWebSecurityConfig {
    @Bean
    public MyUserDetailsServiceImpl userDetailsManager() {
        return new MyUserDetailsServiceImpl();
    }

    @Bean
    public DaoAuthenticationProvider linkWithDB() {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsManager());
        provider.setPasswordEncoder(encoder);


        return provider;
    }



    @Bean
    public SecurityFilterChain configureEndpoints(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(auth -> auth

                .requestMatchers("/").permitAll()

        );

        http.formLogin(form -> form.permitAll());
        http.csrf(csrf-> csrf.disable());
        http.headers(frame-> frame.frameOptions(option->option.disable()));

        return http.build();

    }
}
