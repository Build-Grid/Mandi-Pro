package com.buildgrid.mandipro.dto.response;

import com.buildgrid.mandipro.constants.InviteStatus;
import com.buildgrid.mandipro.constants.RoleConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FirmInviteResponse {
    private UUID id;
    private Long firmId;
    private String firmName;
    private String email;
    private String username;
    private RoleConstants role;
    private Long invitedByUserId;
    private String invitedByName;
    private InviteStatus status;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
}

