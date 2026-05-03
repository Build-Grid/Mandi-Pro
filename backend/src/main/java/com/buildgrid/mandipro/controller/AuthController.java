package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.constants.AppConstants;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.dto.request.AcceptInviteRequest;
import com.buildgrid.mandipro.dto.request.ChangePasswordRequest;
import com.buildgrid.mandipro.dto.request.ForgotPasswordRequest;
import com.buildgrid.mandipro.dto.request.LoginRequest;
import com.buildgrid.mandipro.dto.request.RefreshTokenRequest;
import com.buildgrid.mandipro.dto.request.RegisterFirmRequest;
import com.buildgrid.mandipro.dto.request.ResetPasswordRequest;
import com.buildgrid.mandipro.dto.request.UpdateCurrentUserProfileRequest;
import com.buildgrid.mandipro.dto.response.LoginResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.AuthService;
import com.buildgrid.mandipro.service.FirmInviteService;
import com.buildgrid.mandipro.util.CookieUtils;
import com.buildgrid.mandipro.util.TraceIdUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.buildgrid.mandipro.constants.ApiPaths.AUTH_FORGOT_PASSWORD;
import static com.buildgrid.mandipro.constants.ApiPaths.AUTH_LOGOUT;
import static com.buildgrid.mandipro.constants.ApiPaths.AUTH_REFRESH;
import static com.buildgrid.mandipro.constants.ApiPaths.AUTH_RESET_PASSWORD;

@RestController
@RequestMapping(ApiPaths.AUTH)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Authentication", description = "Endpoints for user login, registration, and token management")
public class AuthController {

    private final AuthService authService;
    private final FirmInviteService firmInviteService;

    @Value("${JWT_ACCESS_EXPIRY_MS}")
    private long jwtAccessExpiryMs;

    @Value("${JWT_REFRESH_EXPIRY_MS}")
    private long jwtRefreshExpiryMs;

    @Value("${app.cookie.http-only:true}")
    private boolean cookieHttpOnly;

    @Value("${app.cookie.secure:false}")
    private boolean cookieSecure;

    @Value("${app.cookie.same-site:Strict}")
    private String cookieSameSite;

    @Value("${app.cookie.domain:}")
    private String cookieDomain;

    @Value("${app.cookie.path:/}")
    private String cookiePath;

    @Operation(summary = "Authenticate user and receive access & refresh tokens")
    @PostMapping(ApiPaths.AUTH_LOGIN)
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        log.info(LogMessages.OPERATION_STARTED, "api.auth.login", TraceIdUtil.get());
        LoginResponse loginResponse = authService.login(loginRequest);

        setAuthCookies(response, loginResponse);
        log.info(LogMessages.OPERATION_COMPLETED, "api.auth.login", TraceIdUtil.get());

        return ResponseEntity.ok(ApiResponse.ok("Login successful", loginResponse));
    }

    @Operation(summary = "Register a new user firm and login immediately")
    @PostMapping(ApiPaths.AUTH_REGISTER)
    public ResponseEntity<ApiResponse<LoginResponse>> register(@Valid @RequestBody RegisterFirmRequest registerFirmRequest,
                                                               HttpServletResponse response) {
        log.info(LogMessages.OPERATION_STARTED, "api.auth.register", TraceIdUtil.get());
        authService.registerFirm(registerFirmRequest);

        LoginRequest loginRequest = LoginRequest.builder()
                .email(registerFirmRequest.getEmail())
                .password(registerFirmRequest.getPassword())
                .build();

        LoginResponse loginResponse = authService.login(loginRequest);
        setAuthCookies(response, loginResponse);
        log.info(LogMessages.OPERATION_COMPLETED, "api.auth.register", TraceIdUtil.get());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of(
                        HttpStatus.CREATED,
                        "Registration and login successful",
                        loginResponse)
                );
    }

    @Operation(summary = "Refresh access token using refresh token")
    @PostMapping(AUTH_REFRESH)
    public ResponseEntity<ApiResponse<LoginResponse>> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        log.info(LogMessages.OPERATION_STARTED, "api.auth.refreshToken", TraceIdUtil.get());
        String refreshToken = CookieUtils.getCookie(request, AppConstants.REFRESH_TOKEN_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElseThrow(() -> new AppException("Refresh token cookie not found", HttpStatus.BAD_REQUEST));

        LoginResponse loginResponse = authService.refreshToken(new RefreshTokenRequest(refreshToken));

        setAuthCookies(response, loginResponse);
        log.info(LogMessages.OPERATION_COMPLETED, "api.auth.refreshToken", TraceIdUtil.get());

        return ResponseEntity.ok(ApiResponse.ok("Token refreshed successfully", loginResponse));
    }

    @Operation(summary = "Logout user and clear authentication cookies")
    @PostMapping(AUTH_LOGOUT)
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request, HttpServletResponse response) {
        log.info(LogMessages.OPERATION_STARTED, "api.auth.logout", TraceIdUtil.get());
        String refreshToken = CookieUtils.getCookie(request, AppConstants.REFRESH_TOKEN_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(null);

        authService.logout(refreshToken);
        CookieUtils.deleteCookie(request, response, AppConstants.ACCESS_TOKEN_COOKIE_NAME,
                cookieHttpOnly, cookieSecure, cookieSameSite, cookieDomain, cookiePath);
        CookieUtils.deleteCookie(request, response, AppConstants.REFRESH_TOKEN_COOKIE_NAME,
                cookieHttpOnly, cookieSecure, cookieSameSite, cookieDomain, cookiePath);
        log.info(LogMessages.OPERATION_COMPLETED, "api.auth.logout", TraceIdUtil.get());

        return ResponseEntity.ok(ApiResponse.ok("Logout successful", null));
    }

    @Operation(summary = "Request a password reset link to be sent to the provided email")
    @PostMapping(AUTH_FORGOT_PASSWORD)
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "api.auth.forgotPassword", TraceIdUtil.get());
        authService.forgotPassword(request);
        log.info(LogMessages.OPERATION_COMPLETED, "api.auth.forgotPassword", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("If the email is registered, a password reset link has been sent", null));
    }

    @Operation(summary = "Reset password using a valid reset token")
    @PostMapping(AUTH_RESET_PASSWORD)
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "api.auth.resetPassword", TraceIdUtil.get());
        authService.resetPassword(request);
        log.info(LogMessages.OPERATION_COMPLETED, "api.auth.resetPassword", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Password has been reset successfully", null));
    }

    @Operation(summary = "Accept a firm invitation and complete onboarding")
    @PostMapping(ApiPaths.AUTH_ACCEPT_INVITE)
    public ResponseEntity<ApiResponse<LoginResponse>> acceptInvite(@Valid @RequestBody AcceptInviteRequest request, HttpServletResponse response) {
        log.info(LogMessages.OPERATION_STARTED, "api.auth.acceptInvite", TraceIdUtil.get());
        LoginResponse loginResponse = firmInviteService.acceptInvite(request);
        setAuthCookies(response, loginResponse);
        log.info(LogMessages.OPERATION_COMPLETED, "api.auth.acceptInvite", TraceIdUtil.get());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of(HttpStatus.CREATED, "Invitation accepted successfully", loginResponse));
    }

    @Operation(summary = "Get current user profile (cached per authenticated user)")
    @GetMapping(ApiPaths.AUTH_ME_PROFILE)
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUserProfile() {
        log.info(LogMessages.OPERATION_STARTED, "api.auth.getCurrentUserProfile", TraceIdUtil.get());
        UserResponse response = authService.getCurrentUserProfile();
        log.info(LogMessages.OPERATION_COMPLETED, "api.auth.getCurrentUserProfile", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Profile retrieved successfully", response));
    }

    @Operation(summary = "Update current user profile (first name and last name)")
    @PutMapping(ApiPaths.AUTH_ME_PROFILE)
    public ResponseEntity<ApiResponse<UserResponse>> updateCurrentUserProfile(@Valid @RequestBody UpdateCurrentUserProfileRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "api.auth.updateCurrentUserProfile", TraceIdUtil.get());
        UserResponse response = authService.updateCurrentUserProfile(request);
        log.info(LogMessages.OPERATION_COMPLETED, "api.auth.updateCurrentUserProfile", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", response));
    }

    @Operation(summary = "Change current user password")
    @PutMapping(ApiPaths.AUTH_ME_CHANGE_PASSWORD)
    public ResponseEntity<ApiResponse<Void>> changeCurrentUserPassword(@Valid @RequestBody ChangePasswordRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "api.auth.changeCurrentUserPassword", TraceIdUtil.get());
        authService.changeCurrentUserPassword(request);
        log.info(LogMessages.OPERATION_COMPLETED, "api.auth.changeCurrentUserPassword", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Password changed successfully", null));
    }

    private void setAuthCookies(HttpServletResponse response, LoginResponse loginResponse) {
        CookieUtils.addCookie(response, AppConstants.ACCESS_TOKEN_COOKIE_NAME, loginResponse.getAccessToken(),
                jwtAccessExpiryMs / 1000, cookieHttpOnly, cookieSecure, cookieSameSite, cookieDomain, cookiePath);
        CookieUtils.addCookie(response, AppConstants.REFRESH_TOKEN_COOKIE_NAME, loginResponse.getRefreshToken(),
                jwtRefreshExpiryMs / 1000, cookieHttpOnly, cookieSecure, cookieSameSite, cookieDomain, cookiePath);
    }
}

