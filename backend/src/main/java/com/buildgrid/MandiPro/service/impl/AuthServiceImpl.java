package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.RoleConstants;
import com.buildgrid.mandipro.dto.mapper.UserMapper;
import com.buildgrid.mandipro.dto.request.LoginRequest;
import com.buildgrid.mandipro.dto.request.RefreshTokenRequest;
import com.buildgrid.mandipro.dto.request.RegisterRequest;
import com.buildgrid.mandipro.dto.response.LoginResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.entity.Firm;
import com.buildgrid.mandipro.entity.RefreshToken;
import com.buildgrid.mandipro.entity.Role;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.FirmRepository;
import com.buildgrid.mandipro.repository.RefreshTokenRepository;
import com.buildgrid.mandipro.repository.RoleRepository;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.security.CustomUserDetailsService;
import com.buildgrid.mandipro.security.JwtTokenProvider;
import com.buildgrid.mandipro.service.AuthService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final RefreshTokenRepository refreshTokenRepository;
    private final FirmRepository firmRepository;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    @Transactional
    public LoginResponse login(LoginRequest loginRequest) {
        log.info("Attempting login for user: {}", loginRequest.getEmail());
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            String accessToken = tokenProvider.generateAccessToken(authentication);
            String refreshTokenString = tokenProvider.generateRefreshToken(authentication);

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            refreshTokenRepository.deleteByUser_Id(user.getId());

            RefreshToken refreshToken = new RefreshToken();
            refreshToken.setToken(refreshTokenString);
            refreshToken.setUser(user);
            refreshTokenRepository.save(refreshToken);

            log.info(LogMessages.USER_LOGIN_SUCCESS, loginRequest.getEmail(), TraceIdUtil.get());

            return LoginResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshTokenString)
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
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new AppException("Username already in use", HttpStatus.CONFLICT);
        }

        User user = userMapper.toEntity(registerRequest);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        String roleName = registerRequest.getRole();
        if (roleName == null || roleName.isEmpty()) {
            roleName = RoleConstants.EMPLOYEE;
        }

        String finalRoleName = roleName;
        Role role = roleRepository.findByName(finalRoleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role " + finalRoleName + " not found"));

        user.setRole(role);

        if (registerRequest.getFirmId() != null) {
            Firm firm = firmRepository.findById(registerRequest.getFirmId())
                    .orElseThrow(() -> new ResourceNotFoundException("Firm not found"));
            user.setFirm(firm);
        }

        User savedUser = userRepository.save(user);
        log.info(LogMessages.USER_REGISTERED, savedUser.getEmail(), TraceIdUtil.get());

        return userMapper.toResponse(savedUser);
    }

    @Override
    @Transactional
    public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String requestRefreshToken = refreshTokenRequest.getRefreshToken();
        
        // 1. Validate token format/signature
        if (!tokenProvider.validateToken(requestRefreshToken)) {
             throw new AppException("Refresh token was expired. Please make a new signin request", HttpStatus.FORBIDDEN);
        }

        // 2. Check existence in DB
        RefreshToken token = refreshTokenRepository.findByToken(requestRefreshToken)
                .orElseThrow(() -> new ResourceNotFoundException("Refresh token is not in database!"));

        // 3. Extract username and load user details
        String username = tokenProvider.getUsernameFromToken(requestRefreshToken); // This is actually email in our case as subject is email
        
        // Note: JwtTokenProvider.generateRefreshToken sets subject as userPrincipal.getUsername().
        // In CustomUserDetailsService, we set username as user.getEmail().
        // So this will return the email.

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        // 4. Generate new access token
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        
        String newAccessToken = tokenProvider.generateAccessToken(authentication);

        return LoginResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(requestRefreshToken) // Return the same refresh token
                .tokenType("Bearer")
                .user(userMapper.toResponse(token.getUser()))
                .build();
    }
}
