package workloadmanagement.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import workloadmanagement.auth.security.JwtFilter;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                            req.requestMatchers(
                                    "/v3/api-docs/**",
                                    "/auth/**",
                                    "/v2/api-docs/**",
                                    "/swagger-resources",
                                    "/swagger-resources/**",
                                    "/configuration/ui",
                                    "/swagger-ui/**",
                                    "/webjars/**",
                                    "/swagger-ui.html"
                            ).permitAll()
                            .requestMatchers(
                                    "/workload-settings/**",
                                    "/workload/my-workloads/**",
                                    "/semester/most-recent",
                                    "/semester/{semesterId}/previous-year",
                                    "/semester"
                            ).hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHINGSTAFF", "ROLE_DIRECTOR")
                            .requestMatchers(
                                    "/academicRankDetails/**",
                                    "/teaching-staff/**",
                                    "/status-type/**",
                                    "/semester/{semesterId}/copy-academic-ranks/**",
                                    "/semester/{semesterId}/copy-workloads/**",
                                    "/semester/{semesterId}",
                                    "/myClass/**",
                                    "/faculty/**",
                                    "/course/**",
                                    "/academicRank/**",
                                    "/workload/**"
                            ).hasAnyAuthority("ROLE_ADMIN", "ROLE_DIRECTOR")

                            .anyRequest().authenticated()
                        )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
