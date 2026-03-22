package com.buildgrid.mandipro.config;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.constants.RoleConstants;
import com.buildgrid.mandipro.security.JwtAuthenticationFilter;
import com.buildgrid.mandipro.security.CustomUserDetailsService;
import com.buildgrid.mandipro.payload.ApiError;
import com.buildgrid.mandipro.util.TraceIdUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.time.LocalDateTime;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ObjectMapper objectMapper;

    private static final String[] SWAGGER_WHITELIST = {
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/webjars/**"
    };

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.ignoringRequestMatchers(ApiPaths.AUTH + "/**"))
                .cors(AbstractHttpConfigurer::disable) // Managed by CorsConfig.java
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // Public
                        .requestMatchers(
                                ApiPaths.AUTH + ApiPaths.AUTH_LOGIN,
                                ApiPaths.AUTH + ApiPaths.AUTH_REGISTER,
                                ApiPaths.AUTH + ApiPaths.AUTH_REFRESH,
                                ApiPaths.HEALTH
                        ).permitAll()

                        // Swagger
                        .requestMatchers(SWAGGER_WHITELIST).permitAll()

                        // Admin
                        .requestMatchers(ApiPaths.ADMIN + "/**")
                        .hasRole(RoleConstants.ADMIN.name())

                        // Owner and Manager
                        .requestMatchers(ApiPaths.FIRM + "/**")
                        .hasAnyRole(RoleConstants.OWNER.name(), RoleConstants.MANAGER.name())

                        // everything else
                        .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint())
                        .accessDeniedHandler(accessDeniedHandler())
                )
                .authenticationProvider(authenticationProvider());

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return (request, response, authException) -> {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            ApiError apiError = ApiError.builder()
                    .success(false)
                    .statusCode(HttpStatus.UNAUTHORIZED.value())
                    .message(authException.getMessage())
                    .traceId(TraceIdUtil.get())
                    .timestamp(LocalDateTime.now())
                    .build();
            response.getWriter().write(objectMapper.writeValueAsString(apiError));
        };
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            ApiError apiError = ApiError.builder()
                    .success(false)
                    .statusCode(HttpStatus.FORBIDDEN.value())
                    .message(accessDeniedException.getMessage())
                    .traceId(TraceIdUtil.get())
                    .timestamp(LocalDateTime.now())
                    .build();
            response.getWriter().write(objectMapper.writeValueAsString(apiError));
        };
    }
}
