package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.dto.request.FirmInviteCreateRequest;
import com.buildgrid.mandipro.dto.response.FirmInviteResponse;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.FirmInviteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(ApiPaths.FIRM)
@RequiredArgsConstructor
@Tag(name = "Firm Invitations", description = "Invitation management endpoints for OWNER and MANAGER")
public class FirmInviteController {

    private final FirmInviteService firmInviteService;

    @Operation(summary = "Send invite to MANAGER or EMPLOYEE")
    @PostMapping(ApiPaths.FIRM_INVITES)
    public ResponseEntity<ApiResponse<FirmInviteResponse>> sendInvite(@Valid @RequestBody FirmInviteCreateRequest request) {
        FirmInviteResponse response = firmInviteService.sendInvite(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of(HttpStatus.CREATED, "Invitation sent successfully", response));
    }

    @Operation(summary = "List all invites for the firm")
    @GetMapping(ApiPaths.FIRM_INVITES)
    public ResponseEntity<ApiResponse<List<FirmInviteResponse>>> listInvites() {
        return ResponseEntity.ok(ApiResponse.ok("Invitations fetched successfully", firmInviteService.listInvites()));
    }

    @Operation(summary = "Cancel a pending invite")
    @DeleteMapping(ApiPaths.FIRM_INVITE_BY_ID)
    public ResponseEntity<ApiResponse<Void>> cancelInvite(@PathVariable UUID inviteId) {
        firmInviteService.cancelInvite(inviteId);
        return ResponseEntity.ok(ApiResponse.ok("Invitation cancelled successfully", null));
    }

    @Operation(summary = "Resend a pending invite with a refreshed token")
    @PostMapping(ApiPaths.FIRM_INVITE_RESEND)
    public ResponseEntity<ApiResponse<FirmInviteResponse>> resendInvite(@PathVariable UUID inviteId) {
        FirmInviteResponse response = firmInviteService.resendInvite(inviteId);
        return ResponseEntity.ok(ApiResponse.ok("Invitation resent successfully", response));
    }
}

