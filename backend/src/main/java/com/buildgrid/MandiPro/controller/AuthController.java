package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.constants.AppConstants;
import com.buildgrid.mandipro.dto.request.LoginRequest;
import com.buildgrid.mandipro.dto.request.RefreshTokenRequest;
import com.buildgrid.mandipro.dto.request.RegisterFirmRequest;
import com.buildgrid.mandipro.dto.response.LoginResponse;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.AuthService;
import com.buildgrid.mandipro.util.CookieUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.buildgrid.mandipro.constants.ApiPaths.AUTH_LOGOUT;
import static com.buildgrid.mandipro.constants.ApiPaths.AUTH_REFRESH;

@RestController
@RequestMapping(ApiPaths.AUTH)
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for user login, registration, and token management")
public class AuthController {

    private final AuthService authService;

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
        LoginResponse loginResponse = authService.login(loginRequest);

        setAuthCookies(response, loginResponse);

        return ResponseEntity.ok(ApiResponse.ok("Login successful", loginResponse));
    }

    @Operation(summary = "Register a new user firm and login immediately")
    @PostMapping(ApiPaths.AUTH_REGISTER)
    public ResponseEntity<ApiResponse<LoginResponse>> register(@Valid @RequestBody RegisterFirmRequest registerFirmRequest,
                                                               HttpServletResponse response) {
        authService.registerFirm(registerFirmRequest);

        LoginRequest loginRequest = LoginRequest.builder()
                .email(registerFirmRequest.getEmail())
                .password(registerFirmRequest.getPassword())
                .build();

        LoginResponse loginResponse = authService.login(loginRequest);
        setAuthCookies(response, loginResponse);

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
        String refreshToken = CookieUtils.getCookie(request, AppConstants.REFRESH_TOKEN_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElseThrow(() -> new AppException("Refresh token cookie not found", HttpStatus.BAD_REQUEST));

        LoginResponse loginResponse = authService.refreshToken(new RefreshTokenRequest(refreshToken));

        setAuthCookies(response, loginResponse);

        return ResponseEntity.ok(ApiResponse.ok("Token refreshed successfully", loginResponse));
    }

    @Operation(summary = "Logout user and clear authentication cookies")
    @PostMapping(AUTH_LOGOUT)
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = CookieUtils.getCookie(request, AppConstants.REFRESH_TOKEN_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(null);

        authService.logout(refreshToken);
        CookieUtils.deleteCookie(request, response, AppConstants.ACCESS_TOKEN_COOKIE_NAME,
                cookieHttpOnly, cookieSecure, cookieSameSite, cookieDomain, cookiePath);
        CookieUtils.deleteCookie(request, response, AppConstants.REFRESH_TOKEN_COOKIE_NAME,
                cookieHttpOnly, cookieSecure, cookieSameSite, cookieDomain, cookiePath);

        return ResponseEntity.ok(ApiResponse.ok("Logout successful", null));
    }

    private void setAuthCookies(HttpServletResponse response, LoginResponse loginResponse) {
        CookieUtils.addCookie(response, AppConstants.ACCESS_TOKEN_COOKIE_NAME, loginResponse.getAccessToken(),
                jwtAccessExpiryMs / 1000, cookieHttpOnly, cookieSecure, cookieSameSite, cookieDomain, cookiePath);
        CookieUtils.addCookie(response, AppConstants.REFRESH_TOKEN_COOKIE_NAME, loginResponse.getRefreshToken(),
                jwtRefreshExpiryMs / 1000, cookieHttpOnly, cookieSecure, cookieSameSite, cookieDomain, cookiePath);
    }
}
