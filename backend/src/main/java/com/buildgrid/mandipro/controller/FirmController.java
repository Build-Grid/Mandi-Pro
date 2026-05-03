package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.dto.request.UpdateFirmProfileRequest;
import com.buildgrid.mandipro.dto.request.UpdateUserRoleRequest;
import com.buildgrid.mandipro.dto.response.FirmProfileResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.FirmUserService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.buildgrid.mandipro.payload.ApiResponse.ok;

@RestController
@RequestMapping(ApiPaths.FIRM)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Firm Management", description = "Endpoints for managing firm users. Accessible by OWNER and MANAGER.")
public class FirmController {

    private final FirmUserService firmUserService;

    @Operation(summary = "Fetch all users in the firm", description = "Returns a list of all users associated with the firm. Accessible by OWNER and MANAGER.")
    @GetMapping(ApiPaths.FIRM_USERS)
    public ResponseEntity<ApiResponse<List<UserResponse>>> fetchAllUsersInFirm() {
        log.info(LogMessages.OPERATION_STARTED, "api.firm.fetchAllUsersInFirm", TraceIdUtil.get());
        List<UserResponse> fetchedUsers = firmUserService.fetchAllUsers();
        log.info(LogMessages.OPERATION_COMPLETED_WITH_COUNT, "api.firm.fetchAllUsersInFirm", fetchedUsers.size(), TraceIdUtil.get());

        return ResponseEntity.ok(ApiResponse.ok("Users fetched successfully", fetchedUsers));
    }

    @Operation(summary = "Fetch user details by user ID", description = "Returns details of a specific user in the firm by their user ID. Accessible by OWNER and MANAGER.")
    @GetMapping(ApiPaths.FIRM_USER)
    public ResponseEntity<ApiResponse<UserResponse>> findUserByUserId(@PathVariable Long userId) {
        log.info(LogMessages.OPERATION_STARTED, "api.firm.findUserByUserId", TraceIdUtil.get());
        UserResponse userResponse = firmUserService.fetchUser(userId);
        log.info(LogMessages.OPERATION_COMPLETED, "api.firm.findUserByUserId", TraceIdUtil.get());
        return ResponseEntity.ok(ok("User details fetched successfully", userResponse));
    }

    @Operation(summary = "Delete a user from the firm by user ID", description = "Deletes a specific user from the firm by their user ID. Accessible by OWNER and MANAGER.")
    @DeleteMapping(ApiPaths.FIRM_USER_DELETE)
    public ResponseEntity<ApiResponse<Void>> deleteUserByUserId(@PathVariable Long userId) {
        log.info(LogMessages.OPERATION_STARTED, "api.firm.deleteUserByUserId", TraceIdUtil.get());
        firmUserService.cancelUser(userId);
        log.info(LogMessages.OPERATION_COMPLETED, "api.firm.deleteUserByUserId", TraceIdUtil.get());
        return ResponseEntity.ok(ok("User deleted successfully", null));
    }

    @Operation(summary = "Update firm profile", description = "Updates firm name. Accessible only by OWNER.")
    @PutMapping(ApiPaths.FIRM_PROFILE)
    public ResponseEntity<ApiResponse<Void>> updateFirmProfile(@Valid @RequestBody UpdateFirmProfileRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "api.firm.updateProfile", TraceIdUtil.get());
        firmUserService.updateFirmProfile(request);
        log.info(LogMessages.OPERATION_COMPLETED, "api.firm.updateProfile", TraceIdUtil.get());
        return ResponseEntity.ok(ok("Firm profile updated successfully", null));
    }

    @Operation(summary = "Fetch firm profile", description = "Fetches firm profile details. Accessible by all roles.")
    @GetMapping(ApiPaths.FIRM_PROFILE_FETCH)
    public ResponseEntity<ApiResponse<FirmProfileResponse>> fetchFirmProfile(){
        log.info(LogMessages.OPERATION_STARTED, "api.firm.fetchProfile", TraceIdUtil.get());
        FirmProfileResponse response = firmUserService.fetchFirmProfile();
        log.info(LogMessages.OPERATION_COMPLETED, "api.firm.fetchProfile", TraceIdUtil.get());
        return ResponseEntity.ok(ok("Firm profile fetched successfully", response));
    }

    @Operation(summary = "Promote or demote user role", description = "Change role between EMPLOYEE and MANAGER. Accessible by OWNER and MANAGER.")
    @PutMapping(ApiPaths.FIRM_USER_ROLE)
    public ResponseEntity<ApiResponse<UserResponse>> updateUserRole(@PathVariable Long userId,
                                                                    @Valid @RequestBody UpdateUserRoleRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "api.firm.updateUserRole", TraceIdUtil.get());
        UserResponse response = firmUserService.updateUserRole(userId, request);
        log.info(LogMessages.OPERATION_COMPLETED, "api.firm.updateUserRole", TraceIdUtil.get());
        return ResponseEntity.ok(ok("User role updated successfully", response));
    }

    @Operation(summary = "Deactivates the firm", description = "Change the status of the firm to CANCEL. Accessible only by OWNER.")
    @DeleteMapping(ApiPaths.FIRM_DELETE)
    public ResponseEntity<ApiResponse<Void>> cancelFirm() {
        log.info(LogMessages.OPERATION_STARTED, "api.firm.cancelFirm", TraceIdUtil.get());
        firmUserService.cancelFirm();
        log.info(LogMessages.OPERATION_COMPLETED, "api.firm.cancelFirm", TraceIdUtil.get());
        return ResponseEntity.ok(ok("Firm cancelled successfully", null));
    }
}
