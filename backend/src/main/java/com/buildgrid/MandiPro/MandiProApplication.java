package com.buildgrid.mandipro;

import com.buildgrid.mandipro.constants.LogMessages;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

@Slf4j
@SpringBootApplication
public class MandiProApplication {

    public static void main(String[] args) {
        SpringApplication.run(MandiProApplication.class, args);
    }

    @Bean
    public CommandLineRunner logStartup(Environment env,
                                      @Value("${SPRING_PROFILE:prod}") String profile,
                                      @Value("${server.port:8080}") String port,
                                      @Value("${APP_VERSION:0.0.1}") String version) {
        return args -> {
            log.info(LogMessages.APP_STARTED, profile, port, version);
        };
    }
}
