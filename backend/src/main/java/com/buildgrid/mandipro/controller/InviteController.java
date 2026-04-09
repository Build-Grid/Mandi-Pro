package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.dto.response.InvitePreviewResponse;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.FirmInviteService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.INVITES)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Invitations", description = "Public invitation preview endpoint")
public class InviteController {

    private final FirmInviteService firmInviteService;

    @Operation(summary = "Preview invitation details by token")
    @GetMapping(ApiPaths.INVITES_PREVIEW)
    public ResponseEntity<ApiResponse<InvitePreviewResponse>> preview(@RequestParam("token") String token) {
        log.info(LogMessages.OPERATION_STARTED, "api.invite.preview", TraceIdUtil.get());
        InvitePreviewResponse response = firmInviteService.previewInvite(token);
        log.info(LogMessages.OPERATION_COMPLETED, "api.invite.preview", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Invitation preview fetched successfully", response));
    }
}

