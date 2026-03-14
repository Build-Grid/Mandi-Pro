package com.buildgrid.mandipro.service;

import com.buildgrid.mandipro.dto.request.LoginRequest;
import com.buildgrid.mandipro.dto.request.RegisterRequest;
import com.buildgrid.mandipro.dto.response.LoginResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    UserResponse register(RegisterRequest registerRequest);
}
