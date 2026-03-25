package com.buildgrid.mandipro.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app.password-reset")
public class PasswordResetConfig {
    private String baseUrl;
    private int expiryMinutes;
}
