package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.util.TraceIdUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@Tag(name = "Health Check", description = "Endpoints for monitoring service status")
@RequiredArgsConstructor
public class HealthController {

    @Value("${SPRING_PROFILE:prod}")
    private String environment;

    @Value("${spring.application.version:0.0.1}")
    private String version;

    @Operation(summary = "Get health status of the application")
    @GetMapping(ApiPaths.HEALTH)
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("environment", environment);
        response.put("version", version);
        response.put("timestamp", LocalDateTime.now());
        response.put("traceId", TraceIdUtil.get());
        
        return ResponseEntity.ok(response);
    }
}
