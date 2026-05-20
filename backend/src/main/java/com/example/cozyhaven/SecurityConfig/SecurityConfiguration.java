package com.example.cozyhaven.SecurityConfig;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfiguration {

        @Bean
        public PasswordEncoder passwordEncoder() throws Exception {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {

                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(List.of("http://localhost:3000"));
                configuration.setAllowedMethods(
                                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(List.of("*"));
                configuration.setAllowCredentials(true);
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
                return http
                                .cors(cors -> {
                                })
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(
                                                                "/hotel/owner/searchByOwnerId/**")
                                                .hasAnyRole("OWNER", "ADMIN")
                                                .requestMatchers(
                                                                "/auth/**",
                                                                "/hotel/all/**",
                                                                "/payment/all/**",
                                                                "/booking/all/**",
                                                                "/review/all/**",
                                                                "/room/all/**")
                                                .permitAll()
                                                .requestMatchers(
                                                                "/hotel/owner/**",
                                                                "/payment/owner/**",
                                                                "/booking/owner/**",
                                                                "/room/owner/**",
                                                                "/review/owner/**",
                                                                "/user/owner/**")
                                                .hasRole("OWNER")
                                                .requestMatchers(
                                                                "/hotel/admin/**",
                                                                "/payment/admin/**",
                                                                "/booking/admin/**",
                                                                "/review/admin/**",
                                                                "/room/admin/**",
                                                                "/user/admin/**")
                                                .hasRole("ADMIN")
                                                .requestMatchers(
                                                                "/payment/customer/**",
                                                                "/booking/customer/**",
                                                                "/review/customer/**",
                                                                "/user/customer/**")
                                                .hasRole("CUSTOMER")
                                                .anyRequest().authenticated())
                                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                                .build();
        }

}
