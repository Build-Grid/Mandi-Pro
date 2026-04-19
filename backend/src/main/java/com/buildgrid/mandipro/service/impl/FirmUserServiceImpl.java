package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.constants.RoleConstants;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.dto.mapper.FirmMapper;
import com.buildgrid.mandipro.dto.mapper.UserMapper;
import com.buildgrid.mandipro.dto.request.UpdateFirmProfileRequest;
import com.buildgrid.mandipro.dto.request.UpdateUserRoleRequest;
import com.buildgrid.mandipro.dto.response.FirmProfileResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.entity.Firm;
import com.buildgrid.mandipro.entity.Role;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.FirmRepository;
import com.buildgrid.mandipro.repository.RoleRepository;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.repository.nativequery.NativeQueryGateway;
import com.buildgrid.mandipro.security.SecurityUtils;
import com.buildgrid.mandipro.service.FirmUserService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.buildgrid.mandipro.util.ValidationUtil.assertFirmActive;
import static com.buildgrid.mandipro.util.ValidationUtil.validateOwnerAndManager;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirmUserServiceImpl implements FirmUserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final FirmRepository firmRepository;
    private final RoleRepository roleRepository;
    private final NativeQueryGateway nativeQueryGateway;
    private final FirmMapper firmMapper;

    @Override
    @Transactional
    public List<UserResponse> fetchAllUsers() {
        log.info(LogMessages.OPERATION_STARTED, "firm.fetchAllUsers", TraceIdUtil.get());

        User currentUser = getCurrentUserOrThrow();
        Long firmId = getFirmIdOrThrow(currentUser);

        List<User> userList = userRepository.findByFirm_Id(firmId)
                .orElseThrow(() -> new ResourceNotFoundException("No users found for the firm"));

        List<UserResponse> responses = userMapper.toResponseList(userList);
        log.info(LogMessages.OPERATION_COMPLETED_WITH_COUNT, "firm.fetchAllUsers", responses.size(), TraceIdUtil.get());
        return responses;
    }

    @Override
    @Transactional
    public void cancelUser(Long userId) {
        log.info(LogMessages.OPERATION_STARTED, "firm.cancelUser", TraceIdUtil.get());

        User user = fetchUserFromIdOrThrow(userId);
        if (user.getStatus() == Status.CANCEL) {
            throw new AppException("User already cancelled", HttpStatus.BAD_REQUEST);
        }
        if (StringUtils.equals(user.getRole().getName(), RoleConstants.OWNER.name())) {
            throw new AppException("Firm owner cannot be cancelled", HttpStatus.BAD_REQUEST);
        }
        user.setStatus(Status.CANCEL);
        userRepository.save(user);

        log.info(LogMessages.OPERATION_COMPLETED, "firm.cancelUser", TraceIdUtil.get());
    }

    @Override
    @Transactional
    public void cancelFirm() {
        log.info(LogMessages.OPERATION_STARTED, "firm.cancelFirm", TraceIdUtil.get());

        User currentUser = getCurrentUserOrThrow();
        Firm firm =  currentUser.getFirm();

        if(!isOwner(currentUser)){
            log.warn(LogMessages.OPERATION_FORBIDDEN, "firm.cancelFirm", currentUser.getEmail(), TraceIdUtil.get());
            throw new AppException("Only the owner can cancel the firm", HttpStatus.FORBIDDEN);
        }

        nativeQueryGateway.cancelFirmAndRelatedUsers(firm.getId());

        log.info(LogMessages.OPERATION_COMPLETED, "firm.cancelFirm", TraceIdUtil.get());
    }

    @Override
    @Transactional
    public void updateFirmProfile(UpdateFirmProfileRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "firm.updateProfile", TraceIdUtil.get());

        User currentUser = getCurrentUserOrThrow();
        if (!isOwner(currentUser)) {
            log.warn(LogMessages.OPERATION_FORBIDDEN, "firm.updateProfile", currentUser.getEmail(), TraceIdUtil.get());
            throw new AppException("Only the owner can update firm profile", HttpStatus.FORBIDDEN);
        }

        String firmName = StringUtils.trimToNull(request.getFirmName());
        if (firmName == null) {
            throw new AppException("Firm name is required", HttpStatus.BAD_REQUEST);
        }

        Firm firm = currentUser.getFirm();
        assertFirmActive(firm, "firm.updateProfile");

        firm.setName(firmName);
        firmRepository.save(firm);

        log.info(LogMessages.FIRM_PROFILE_UPDATED, firm.getId(), TraceIdUtil.get());
        log.info(LogMessages.OPERATION_COMPLETED, "firm.updateProfile", TraceIdUtil.get());
    }

    @Override
    @Transactional
    public UserResponse updateUserRole(Long userId, UpdateUserRoleRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "firm.updateUserRole", TraceIdUtil.get());

        User actor = getCurrentUserOrThrow();
        validateOwnerAndManager(actor, "firm.updateUserRole", "Only OWNER or MANAGER can update user role");

        User targetUser = fetchUserFromIdOrThrow(userId);
        if (targetUser.getId().equals(actor.getId())) {
            throw new AppException("You cannot change your own role", HttpStatus.BAD_REQUEST);
        }

        RoleConstants targetRole = request.getRole();
        validatePromotableRole(targetRole);

        RoleConstants currentRole = RoleConstants.valueOf(targetUser.getRole().getName());
        validatePromotableRole(currentRole);

        if (currentRole == targetRole) {
            throw new AppException("User already has this role", HttpStatus.BAD_REQUEST);
        }

        targetUser.setRole(roleRepository.findByName(targetRole.name())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + targetRole.name())));
        User savedUser = userRepository.save(targetUser);

        log.info(LogMessages.USER_ROLE_UPDATED, savedUser.getId(), targetRole.name(), TraceIdUtil.get());
        log.info(LogMessages.OPERATION_COMPLETED, "firm.updateUserRole", TraceIdUtil.get());
        return userMapper.toResponse(savedUser);
    }

    @Override
    @Transactional
    public FirmProfileResponse fetchFirmProfile() {
        log.info(LogMessages.OPERATION_STARTED, "firm.fetchFirmProfile", TraceIdUtil.get());

        User currentUser = getCurrentUserOrThrow();
        Firm firm = currentUser.getFirm();

        FirmProfileResponse response = firmMapper.toFirmProfileResponse(firm);
        Role ownerRole = roleRepository.findByName(RoleConstants.OWNER.name())
                .orElseThrow(() -> new AppException("Owner role not found", HttpStatus.BAD_REQUEST));
        User owner = userRepository.getByRoleAndFirmId(ownerRole,firm.getId())
                .orElseThrow(() -> new AppException("Owner user not found for the firm", HttpStatus.BAD_REQUEST));
        response.setOwnerEmail(owner.getEmail());
        String ownerName = StringUtils.trimToNull(owner.getFirstName() + " " + owner.getLastName());
        response.setOwnerName(ownerName.isEmpty() ? ownerName : owner.getUsername());

        log.info(LogMessages.OPERATION_COMPLETED, "firm.fetchFirmProfile", TraceIdUtil.get());
        return response;
    }

    @Override
    @Transactional
    public UserResponse fetchUser(Long userId) {
        log.info(LogMessages.OPERATION_STARTED, "firm.fetchUser", TraceIdUtil.get());

        User user = fetchUserFromIdOrThrow(userId);
        UserResponse response = userMapper.toResponse(user);

        log.info(LogMessages.OPERATION_COMPLETED, "firm.fetchUser", TraceIdUtil.get());
        return response;
    }

    private boolean isOwner(User currentUser) {
        return StringUtils.equals(currentUser.getRole().getName(),RoleConstants.OWNER.name());
    }

    private void validatePromotableRole(RoleConstants role) {
        if (role != RoleConstants.MANAGER && role != RoleConstants.EMPLOYEE) {
            throw new AppException("Only EMPLOYEE and MANAGER roles can be updated", HttpStatus.BAD_REQUEST);
        }
    }


    private User fetchUserFromIdOrThrow(Long userId){
        User currentUser = getCurrentUserOrThrow();
        Long firmId = getFirmIdOrThrow(currentUser);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        if (!user.getFirm().getId().equals(firmId)) {
            throw new AppException("User does not belong to the same firm", HttpStatus.FORBIDDEN);
        }

        assertFirmActive(user.getFirm(), "firm.fetchUserFromId");

        return user;
    }

    private User getCurrentUserOrThrow() {
        String email = SecurityUtils.getCurrentUserEmail()
                .orElseThrow(() -> new AppException("Not authenticated", HttpStatus.UNAUTHORIZED));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        if (user.getFirm() != null) {
            assertFirmActive(user.getFirm(), "firm.authenticatedAccess");
        }

        return user;
    }

    private Long getFirmIdOrThrow(User currentUser) {
        Firm firm = currentUser.getFirm();
        if(firm == null) {
            throw new AppException("User not associated with any firm.", HttpStatus.FORBIDDEN);
        }

        assertFirmActive(firm, "firm.access");

        return firm.getId();
    }

}

