package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.RoleConstants;
import com.buildgrid.mandipro.dto.mapper.UserMapper;
import com.buildgrid.mandipro.dto.request.LoginRequest;
import com.buildgrid.mandipro.dto.request.RegisterRequest;
import com.buildgrid.mandipro.dto.response.LoginResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.entity.Role;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.RoleRepository;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.security.JwtTokenProvider;
import com.buildgrid.mandipro.service.AuthService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final UserMapper userMapper;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        log.info("Attempting login for user: {}", loginRequest.getEmail());
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            String accessToken = tokenProvider.generateAccessToken(authentication);
            String refreshToken = tokenProvider.generateRefreshToken(authentication);

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            log.info(LogMessages.USER_LOGIN_SUCCESS, loginRequest.getEmail(), TraceIdUtil.get());

            return LoginResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .tokenType("Bearer")
                    .user(userMapper.toResponse(user))
                    .build();
        } catch (Exception e) {
            log.error(LogMessages.USER_LOGIN_FAILED, loginRequest.getEmail(), TraceIdUtil.get());
            throw e;
        }
    }

    @Override
    @Transactional
    public UserResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new AppException("Email already in use", HttpStatus.CONFLICT);
        }

        User user = userMapper.toEntity(registerRequest);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        String roleName = registerRequest.getRole();
        if (roleName == null || roleName.isEmpty()) {
            roleName = RoleConstants.WORKER;
        }

        String finalRoleName = roleName;
        Role role = roleRepository.findByName(finalRoleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role " + finalRoleName + " not found"));

        user.setRole(role);

        User savedUser = userRepository.save(user);
        log.info(LogMessages.USER_REGISTERED, savedUser.getEmail(), TraceIdUtil.get());

        return userMapper.toResponse(savedUser);
    }
}
