package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.dto.request.LoginRequest;
import com.buildgrid.mandipro.dto.request.RegisterRequest;
import com.buildgrid.mandipro.dto.response.LoginResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.AUTH)
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for user login, registration, and token management")
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "Authenticate user and receive access & refresh tokens")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = authService.login(loginRequest);
        return ResponseEntity.ok(ApiResponse.ok("Login successful", loginResponse));
    }

    @Operation(summary = "Register a new user account")
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest registerRequest) {
        UserResponse userResponse = authService.register(registerRequest);
        return ResponseEntity.ok(ApiResponse.created(userResponse));
    }
}
