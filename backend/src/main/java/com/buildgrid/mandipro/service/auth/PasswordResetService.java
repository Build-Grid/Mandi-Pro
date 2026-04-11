package com.buildgrid.mandipro.service.auth;

import com.buildgrid.mandipro.config.PasswordResetConfig;
import com.buildgrid.mandipro.entity.PasswordResetToken;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.repository.PasswordResetTokenRepository;
import com.buildgrid.mandipro.repository.nativequery.NativeQueryGateway;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final NativeQueryGateway nativeQueryGateway;
    private final PasswordResetConfig passwordResetConfig;

    @Transactional
    public String createToken(User user) {
        nativeQueryGateway.deleteExpiredOrUsedPasswordResetTokensByUserId(
                user.getId(),
                LocalDateTime.now()
        );

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiresAt(LocalDateTime.now().plusMinutes(passwordResetConfig.getExpiryMinutes()))
                .used(false)
                .build();
        passwordResetTokenRepository.save(resetToken);
        return token;
    }

    public PasswordResetToken validateToken(String token) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new AppException("Invalid or expired password reset token", HttpStatus.BAD_REQUEST));

        if (resetToken.isExpired()) {
            throw new AppException("Password reset token has expired", HttpStatus.BAD_REQUEST);
        }

        if (resetToken.isUsed()) {
            throw new AppException("Password reset token has already been used", HttpStatus.BAD_REQUEST);
        }

        return resetToken;
    }

    @Transactional
    public void markTokenUsed(PasswordResetToken token) {
        token.setUsed(true);
        passwordResetTokenRepository.save(token);
    }
}
