package com.buildgrid.mandipro.service;

import com.buildgrid.mandipro.dto.request.RegisterRequest;
import com.buildgrid.mandipro.dto.response.UserResponse;

public interface FirmUserService {
    UserResponse createFirmUser(RegisterRequest request);
}
