package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.dto.mapper.UserMapper;
import com.buildgrid.mandipro.dto.request.LoginRequest;
import com.buildgrid.mandipro.dto.request.RefreshTokenRequest;
import com.buildgrid.mandipro.dto.request.RegisterFirmRequest;
import com.buildgrid.mandipro.dto.response.LoginResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.entity.RefreshToken;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.security.CustomUserDetailsService;
import com.buildgrid.mandipro.service.AuthService;
import com.buildgrid.mandipro.service.auth.AuthFlowService;
import com.buildgrid.mandipro.service.auth.FirmRegistrationService;
import com.buildgrid.mandipro.service.auth.RefreshTokenService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthFlowService authFlowService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RefreshTokenService refreshTokenService;
    private final FirmRegistrationService firmRegistrationService;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    @Transactional
    public LoginResponse login(LoginRequest loginRequest) {
        log.info("Attempting login for user: {}", loginRequest.getEmail());

        try {
            Authentication authentication = authFlowService.authenticate(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );
            AuthFlowService.AuthTokens authTokens = authFlowService.issueTokens(authentication);

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            refreshTokenService.replaceUserRefreshToken(user, authTokens.getRefreshToken());

            log.info(LogMessages.USER_LOGIN_SUCCESS, loginRequest.getEmail(), TraceIdUtil.get());

            return LoginResponse.builder()
                    .accessToken(authTokens.getAccessToken())
                    .refreshToken(authTokens.getRefreshToken())
                    .tokenType("Bearer")
                    .user(userMapper.toResponse(user))
                    .build();
        } catch (Exception e) {
            log.error(LogMessages.USER_LOGIN_FAILED, loginRequest.getEmail(), TraceIdUtil.get());
            throw e;
        }
    }

    @Override
    @Transactional
    public void registerFirm(RegisterFirmRequest registerFirmRequest) {
        firmRegistrationService.registerFirmWithOwner(registerFirmRequest);
    }

    @Override
    @Transactional
    public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String requestRefreshToken = refreshTokenRequest.getRefreshToken();

        RefreshToken token = refreshTokenService.validateAndGetStoredToken(requestRefreshToken);
        String username = refreshTokenService.extractUsername(requestRefreshToken);
        log.info(LogMessages.TOKEN_VALIDATED, username, TraceIdUtil.get());

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        Authentication authentication = authFlowService.buildAuthentication(userDetails);
        String newAccessToken = authFlowService.issueAccessToken(authentication);

        return LoginResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(requestRefreshToken)
                .tokenType("Bearer")
                .user(userMapper.toResponse(token.getUser()))
                .build();
    }

    @Override
    @Transactional
    public void logout(String refreshToken) {
        refreshTokenService.revokeByToken(refreshToken);
    }
}
