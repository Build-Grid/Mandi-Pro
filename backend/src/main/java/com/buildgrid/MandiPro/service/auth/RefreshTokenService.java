package com.buildgrid.mandipro.service.auth;

import com.buildgrid.mandipro.entity.RefreshToken;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.RefreshTokenRepository;
import com.buildgrid.mandipro.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private static final String EXPIRED_TOKEN_MESSAGE = "Refresh token was expired. Please make a new signin request";

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider tokenProvider;

    public void replaceUserRefreshToken(User user, String refreshTokenValue) {
        refreshTokenRepository.deleteByUser_Id(user.getId());

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(refreshTokenValue);
        refreshToken.setUser(user);
        refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken validateAndGetStoredToken(String refreshTokenValue) {
        if (!tokenProvider.validateToken(refreshTokenValue)) {
            throw new AppException(EXPIRED_TOKEN_MESSAGE, HttpStatus.FORBIDDEN);
        }

        return refreshTokenRepository.findByToken(refreshTokenValue)
                .orElseThrow(() -> new ResourceNotFoundException("Refresh token is not in database!"));
    }

    public String extractUsername(String refreshTokenValue) {
        return tokenProvider.getUsernameFromToken(refreshTokenValue);
    }

    public void revokeByToken(String refreshTokenValue) {
        if (StringUtils.hasText(refreshTokenValue)) {
            refreshTokenRepository.deleteByToken(refreshTokenValue);
        }
    }
}

