package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.RoleConstants;
import com.buildgrid.mandipro.dto.mapper.UserMapper;
import com.buildgrid.mandipro.dto.request.CreateFirmUserRequest;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.entity.Firm;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.RoleRepository;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.security.SecurityUtils;
import com.buildgrid.mandipro.service.FirmUserService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirmUserServiceImpl implements FirmUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public UserResponse createFirmUser(CreateFirmUserRequest request) {
        String currentUserEmail = SecurityUtils.getCurrentUserEmail()
                .orElseThrow(() -> new AppException("Not authenticated", HttpStatus.UNAUTHORIZED));

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        Firm firm = currentUser.getFirm();
        if (firm == null) {
            throw new AppException("Authenticated user is not associated with a firm", HttpStatus.FORBIDDEN);
        }

        validateRole(request.getRole());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException("Email already in use", HttpStatus.CONFLICT);
        }

        String username = StringUtils.trimToNull(request.getUsername());
        if (username == null) {
            throw new AppException("Username must not be blank", HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByUsernameAndFirm_Id(username, firm.getId())) {
            throw new AppException("Username already in use within this firm", HttpStatus.CONFLICT);
        }

        User user = User.builder()
                .username(username)
                .firstName(StringUtils.trimToNull(request.getFirstName()))
                .lastName(StringUtils.trimToNull(request.getLastName()))
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firm(firm)
                .role(roleRepository.findByName(request.getRole().name())
                        .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + request.getRole())))
                .build();

        User savedUser = userRepository.save(user);
        log.info(LogMessages.FIRM_USER_CREATED, savedUser.getEmail(), firm.getId(), TraceIdUtil.get());

        return userMapper.toResponse(savedUser);
    }

    private void validateRole(RoleConstants role) {
        if (role != RoleConstants.EMPLOYEE && role != RoleConstants.MANAGER) {
            throw new AppException("Role must be EMPLOYEE or MANAGER", HttpStatus.BAD_REQUEST);
        }
    }
}
