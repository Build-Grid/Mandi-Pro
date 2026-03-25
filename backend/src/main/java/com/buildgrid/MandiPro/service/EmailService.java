package com.buildgrid.mandipro.service;

import java.time.LocalDateTime;

public interface EmailService {
    void sendPasswordResetEmail(String to, String resetLink, int expiryMinutes);

    void sendFirmInviteEmail(String to,
                             String firmName,
                             String invitedRole,
                             String inviterName,
                             String inviteeEmail,
                             LocalDateTime expiresAt,
                             String acceptLink);
}
