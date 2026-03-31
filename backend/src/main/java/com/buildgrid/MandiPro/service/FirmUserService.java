package com.buildgrid.mandipro.service;

import com.buildgrid.mandipro.dto.request.UpdateFirmProfileRequest;
import com.buildgrid.mandipro.dto.request.UpdateUserRoleRequest;
import com.buildgrid.mandipro.dto.response.UserResponse;

import java.util.List;

public interface FirmUserService {
    List<UserResponse> fetchAllUsers();
    UserResponse fetchUser(Long userId);
    void cancelUser(Long userId);
    void cancelFirm();
    void updateFirmProfile(UpdateFirmProfileRequest request);
    UserResponse updateUserRole(Long userId, UpdateUserRoleRequest request);
}
