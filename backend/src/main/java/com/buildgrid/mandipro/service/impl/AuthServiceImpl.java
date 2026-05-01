package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.config.PasswordResetConfig;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.dto.mapper.UserMapper;
import com.buildgrid.mandipro.dto.request.ForgotPasswordRequest;
import com.buildgrid.mandipro.dto.request.LoginRequest;
import com.buildgrid.mandipro.dto.request.RefreshTokenRequest;
import com.buildgrid.mandipro.dto.request.RegisterFirmRequest;
import com.buildgrid.mandipro.dto.request.ResetPasswordRequest;
import com.buildgrid.mandipro.dto.request.UpdateCurrentUserProfileRequest;
import com.buildgrid.mandipro.dto.request.ChangePasswordRequest;
import com.buildgrid.mandipro.dto.response.LoginResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.entity.PasswordResetToken;
import com.buildgrid.mandipro.entity.RefreshToken;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.security.CustomUserDetailsService;
import com.buildgrid.mandipro.service.AuthService;
import com.buildgrid.mandipro.service.EmailService;
import com.buildgrid.mandipro.service.auth.AuthFlowService;
import com.buildgrid.mandipro.service.auth.FirmRegistrationService;
import com.buildgrid.mandipro.service.auth.PasswordResetService;
import com.buildgrid.mandipro.service.auth.RefreshTokenService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.apache.commons.lang3.StringUtils;

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
    private final PasswordResetService passwordResetService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetConfig passwordResetConfig;

    @Override
    @Transactional
    public LoginResponse login(LoginRequest loginRequest) {
        log.info(LogMessages.AUTH_LOGIN_ATTEMPT, loginRequest.getEmail(), TraceIdUtil.get());

        try {
            Authentication authentication = authFlowService.authenticate(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );
            AuthFlowService.AuthTokens authTokens = authFlowService.issueTokens(authentication);

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            assertUserFirmActive(user, "auth.login");

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
        log.info(LogMessages.OPERATION_STARTED, "auth.registerFirm", TraceIdUtil.get());
        firmRegistrationService.registerFirmWithOwner(registerFirmRequest);
        log.info(LogMessages.OPERATION_COMPLETED, "auth.registerFirm", TraceIdUtil.get());
    }

    @Override
    @Transactional
    public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        log.info(LogMessages.TOKEN_REFRESH_REQUESTED, TraceIdUtil.get());

        String requestRefreshToken = refreshTokenRequest.getRefreshToken();

        RefreshToken token = refreshTokenService.validateAndGetStoredToken(requestRefreshToken);
        String username = refreshTokenService.extractUsername(requestRefreshToken);
        log.info(LogMessages.TOKEN_VALIDATED, username, TraceIdUtil.get());

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        Authentication authentication = authFlowService.buildAuthentication(userDetails);
        String newAccessToken = authFlowService.issueAccessToken(authentication);

        assertUserFirmActive(token.getUser(), "auth.refreshToken");
        log.info(LogMessages.TOKEN_REFRESH_SUCCESS, username, TraceIdUtil.get());

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
        log.info(LogMessages.USER_LOGOUT, TraceIdUtil.get());
    }

    @Override
    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        log.info(LogMessages.PASSWORD_RESET_REQUESTED, request.getEmail(), TraceIdUtil.get());

        userRepository.findByEmail(request.getEmail()).ifPresent(user -> {
            if (!isFirmActive(user)) {
                Long firmId = user.getFirm() == null ? null : user.getFirm().getId();
                Status firmStatus = user.getFirm() == null ? null : user.getFirm().getStatus();
                log.warn(LogMessages.FIRM_INACTIVE_BLOCKED, "auth.forgotPassword", firmId, firmStatus, TraceIdUtil.get());
                return;
            }
            String token = passwordResetService.createToken(user);
            String resetLink = passwordResetConfig.getBaseUrl() + "?token=" + token;
            emailService.sendPasswordResetEmail(user.getEmail(), resetLink, passwordResetConfig.getExpiryMinutes());
        });
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        PasswordResetToken resetToken = passwordResetService.validateToken(request.getToken());

        User user = resetToken.getUser();
        assertUserFirmActive(user, "auth.resetPassword");
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        passwordResetService.markTokenUsed(resetToken);

        log.info(LogMessages.PASSWORD_RESET_SUCCESS, user.getEmail(), TraceIdUtil.get());
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(
            value = "userProfile",
            key = "T(com.buildgrid.mandipro.security.SecurityUtils).getCurrentUserEmail().orElse('anonymous')",
            unless = "#result == null"
    )
    public UserResponse getCurrentUserProfile() {
        log.info(LogMessages.OPERATION_STARTED, "auth.getCurrentUserProfile", TraceIdUtil.get());

        User currentUser = getCurrentUserOrThrow();
        assertUserFirmActive(currentUser, "auth.getCurrentUserProfile");

        log.info(LogMessages.OPERATION_COMPLETED, "auth.getCurrentUserProfile", TraceIdUtil.get());
        return userMapper.toResponse(currentUser);
    }

    @Override
    @Transactional
    @CacheEvict(
            value = "userProfile",
            key = "T(com.buildgrid.mandipro.security.SecurityUtils).getCurrentUserEmail().orElse('anonymous')"
    )
    public UserResponse updateCurrentUserProfile(UpdateCurrentUserProfileRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "auth.updateCurrentUserProfile", TraceIdUtil.get());

        User currentUser = getCurrentUserOrThrow();
        assertUserFirmActive(currentUser, "auth.updateCurrentUserProfile");

        String firstName = StringUtils.trimToNull(request.getFirstName());
        String lastName = StringUtils.trimToNull(request.getLastName());

        if (firstName == null && lastName == null) {
            throw new AppException("At least one field must be provided for profile update", HttpStatus.BAD_REQUEST);
        }

        if (firstName != null) {
            currentUser.setFirstName(firstName);
        }
        if (lastName != null) {
            currentUser.setLastName(lastName);
        }

        User savedUser = userRepository.save(currentUser);

        log.info(LogMessages.USER_PROFILE_UPDATED, savedUser.getEmail(), TraceIdUtil.get());
        log.info(LogMessages.OPERATION_COMPLETED, "auth.updateCurrentUserProfile", TraceIdUtil.get());
        return userMapper.toResponse(savedUser);
    }

    @Override
    @Transactional
    public void changeCurrentUserPassword(ChangePasswordRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "auth.changeCurrentUserPassword", TraceIdUtil.get());

        User currentUser = getCurrentUserOrThrow();
        assertUserFirmActive(currentUser, "auth.changeCurrentUserPassword");

        if (!passwordEncoder.matches(request.getCurrentPassword(), currentUser.getPassword())) {
            throw new AppException("Current password is incorrect", HttpStatus.BAD_REQUEST);
        }

        if (passwordEncoder.matches(request.getNewPassword(), currentUser.getPassword())) {
            throw new AppException("New password must be different from current password", HttpStatus.BAD_REQUEST);
        }

        currentUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(currentUser);

        log.info(LogMessages.USER_PASSWORD_CHANGED, currentUser.getEmail(), TraceIdUtil.get());
        log.info(LogMessages.OPERATION_COMPLETED, "auth.changeCurrentUserPassword", TraceIdUtil.get());
    }

    private void assertUserFirmActive(User user, String operationName) {
        if (!isFirmActive(user)) {
            Long firmId = user.getFirm() == null ? null : user.getFirm().getId();
            Status firmStatus = user.getFirm() == null ? null : user.getFirm().getStatus();
            log.warn(LogMessages.FIRM_INACTIVE_BLOCKED, operationName, firmId, firmStatus, TraceIdUtil.get());
            throw new AppException("Firm is no longer active", HttpStatus.FORBIDDEN);
        }
    }

    private boolean isFirmActive(User user) {
        return user.getFirm() == null || user.getFirm().getStatus() == Status.ACTIVE;
    }

    private User getCurrentUserOrThrow() {
        String email = com.buildgrid.mandipro.security.SecurityUtils.getCurrentUserEmail()
                .orElseThrow(() -> new AppException("Not authenticated", HttpStatus.UNAUTHORIZED));

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }
}

