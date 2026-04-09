package com.buildgrid.mandipro.dto.response;

import com.buildgrid.mandipro.constants.RoleConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvitePreviewResponse {
    private String firmName;
    private String email;
    private RoleConstants role;
    private LocalDateTime expiresAt;
}

