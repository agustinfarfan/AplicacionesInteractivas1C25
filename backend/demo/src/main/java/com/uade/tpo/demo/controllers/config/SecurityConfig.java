package com.uade.tpo.demo.controllers.config;

import com.uade.tpo.demo.enums.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import lombok.RequiredArgsConstructor;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        // Cart
                        .requestMatchers("/cart/**").hasAnyAuthority(Role.USER.name(), Role.VENDOR.name())
                        .requestMatchers(HttpMethod.GET, "/cart").hasAnyAuthority(Role.VENDOR.name())

                        // Productos
                        .requestMatchers(HttpMethod.GET,"/productos/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/productos/**").hasAnyAuthority(Role.VENDOR.name())
                        .requestMatchers(HttpMethod.PUT,"/productos/**").hasAnyAuthority(Role.VENDOR.name())
                        .requestMatchers(HttpMethod.DELETE,"/productos/**").hasAnyAuthority(Role.VENDOR.name())

                        // Publicaciones
                        .requestMatchers(HttpMethod.GET, "/publicaciones/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/publicaciones/**").hasAnyAuthority(Role.VENDOR.name())
                        .requestMatchers(HttpMethod.PUT, "/publicaciones/**").hasAnyAuthority(Role.VENDOR.name())
                        .requestMatchers(HttpMethod.DELETE, "/publicaciones/**").hasAnyAuthority(Role.VENDOR.name())

                        // Ordenes
                        .requestMatchers("/orders/**").hasAnyAuthority(Role.VENDOR.name())

                        // Categorias
                        .requestMatchers(HttpMethod.GET,"/categories/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/categories/**").hasAnyAuthority(Role.VENDOR.name())
                        .requestMatchers(HttpMethod.PUT,"/categories/**").hasAnyAuthority(Role.VENDOR.name())
                        .requestMatchers(HttpMethod.DELETE,"/categories/**").hasAnyAuthority(Role.VENDOR.name())

                        // Clientes
                        .requestMatchers(HttpMethod.GET,"/clientes/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/clientes/**").hasAnyAuthority(Role.VENDOR.name())
                        .requestMatchers(HttpMethod.PUT,"/clientes/**").hasAnyAuthority(Role.VENDOR.name())
                        .requestMatchers(HttpMethod.DELETE,"/clientes/**").hasAnyAuthority(Role.VENDOR.name())

                        // Admin
                        .requestMatchers("admin/**").hasAnyAuthority(Role.VENDOR.name())

                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // if sending cookies or Authorization header

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
