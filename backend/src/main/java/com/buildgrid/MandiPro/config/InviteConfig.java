package com.buildgrid.mandipro.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app.invite")
public class InviteConfig {
    private String acceptBaseUrl;
    private int expiryHours;
}

