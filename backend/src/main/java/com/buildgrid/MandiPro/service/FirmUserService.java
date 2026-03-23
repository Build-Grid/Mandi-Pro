package com.buildgrid.mandipro.service;

import com.buildgrid.mandipro.dto.request.CreateFirmUserRequest;
import com.buildgrid.mandipro.dto.response.UserResponse;

public interface FirmUserService {
    UserResponse createFirmUser(CreateFirmUserRequest request);
}
