package com.buildgrid.mandipro.service;

import com.buildgrid.mandipro.dto.request.ForgotPasswordRequest;
import com.buildgrid.mandipro.dto.request.LoginRequest;
import com.buildgrid.mandipro.dto.request.RefreshTokenRequest;
import com.buildgrid.mandipro.dto.request.RegisterFirmRequest;
import com.buildgrid.mandipro.dto.request.ResetPasswordRequest;
import com.buildgrid.mandipro.dto.response.LoginResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    void registerFirm(RegisterFirmRequest registerFirmRequest);
    LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
    void logout(String refreshToken);
    void forgotPassword(ForgotPasswordRequest request);
    void resetPassword(ResetPasswordRequest request);
}
