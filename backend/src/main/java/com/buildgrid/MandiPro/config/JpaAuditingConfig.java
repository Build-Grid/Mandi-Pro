package com.buildgrid.mandipro.config;

import com.buildgrid.mandipro.audit.AuditorAwareImpl;
import com.buildgrid.mandipro.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
@EnableJpaRepositories(basePackages = "com.buildgrid.mandipro.repository",
        namedQueriesLocation = "classpath:app.sql")
public class JpaAuditingConfig {

    @Bean
    public AuditorAware<String> auditorProvider(UserRepository userRepository) {
        return new AuditorAwareImpl(userRepository);
    }
}
