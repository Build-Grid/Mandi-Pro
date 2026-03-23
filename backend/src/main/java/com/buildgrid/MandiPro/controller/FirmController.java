package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.dto.request.CreateFirmUserRequest;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.FirmUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.FIRM)
@RequiredArgsConstructor
@Tag(name = "Firm Management", description = "Endpoints for managing firm users. Accessible by OWNER and MANAGER.")
public class FirmController {

    private final FirmUserService firmUserService;

    @Operation(summary = "Create a new firm user with role EMPLOYEE or MANAGER")
    @PostMapping(ApiPaths.FIRM_USERS)
    public ResponseEntity<ApiResponse<UserResponse>> createFirmUser(@Valid @RequestBody CreateFirmUserRequest request) {
        UserResponse userResponse = firmUserService.createFirmUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of(HttpStatus.CREATED, "User created successfully", userResponse));
    }
}
