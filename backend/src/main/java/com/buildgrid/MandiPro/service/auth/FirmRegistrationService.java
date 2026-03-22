package com.buildgrid.mandipro.service.auth;

import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.RoleConstants;
import com.buildgrid.mandipro.dto.mapper.FirmMapper;
import com.buildgrid.mandipro.dto.mapper.UserMapper;
import com.buildgrid.mandipro.dto.request.RegisterFirmRequest;
import com.buildgrid.mandipro.entity.Firm;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.FirmRepository;
import com.buildgrid.mandipro.repository.RoleRepository;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.util.TraceIdUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirmRegistrationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final FirmMapper firmMapper;
    private final FirmRepository firmRepository;

    public void registerFirmWithOwner(RegisterFirmRequest registerFirmRequest) {
        validateUniqueness(registerFirmRequest);

        Firm firm = firmMapper.toEntity(registerFirmRequest);
        firm = firmRepository.save(firm);
        log.info(LogMessages.FIRM_REGISTERED, firm.getName(), TraceIdUtil.get());

        User user = userMapper.toEntity(registerFirmRequest);
        user.setPassword(passwordEncoder.encode(registerFirmRequest.getPassword()));
        user.setFirm(firm);
        user.setRole(roleRepository.findByName(RoleConstants.OWNER.name())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found")));

        User savedUser = userRepository.save(user);
        log.info(LogMessages.USER_REGISTERED, savedUser.getEmail(), TraceIdUtil.get());
    }

    private void validateUniqueness(RegisterFirmRequest registerFirmRequest) {
        if (userRepository.existsByEmail(registerFirmRequest.getEmail())) {
            throw new AppException("Email already in use", HttpStatus.CONFLICT);
        }
        if (userRepository.existsByUsername(registerFirmRequest.getUsername())) {
            throw new AppException("Username already in use", HttpStatus.CONFLICT);
        }
    }
}

