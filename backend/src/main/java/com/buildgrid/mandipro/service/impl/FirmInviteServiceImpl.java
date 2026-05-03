package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.config.InviteConfig;
import com.buildgrid.mandipro.constants.InviteStatus;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.RoleConstants;
import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.dto.mapper.FirmInviteMapper;
import com.buildgrid.mandipro.dto.mapper.UserMapper;
import com.buildgrid.mandipro.dto.request.AcceptInviteRequest;
import com.buildgrid.mandipro.dto.request.FirmInviteCreateRequest;
import com.buildgrid.mandipro.dto.request.LoginRequest;
import com.buildgrid.mandipro.dto.response.FirmInviteResponse;
import com.buildgrid.mandipro.dto.response.InvitePreviewResponse;
import com.buildgrid.mandipro.dto.response.LoginResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.entity.Firm;
import com.buildgrid.mandipro.entity.FirmInvite;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.FirmInviteRepository;
import com.buildgrid.mandipro.repository.RoleRepository;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.security.SecurityUtils;
import com.buildgrid.mandipro.service.AuthService;
import com.buildgrid.mandipro.service.EmailService;
import com.buildgrid.mandipro.service.FirmInviteService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import static com.buildgrid.mandipro.util.ValidationUtil.assertFirmActive;
import static com.buildgrid.mandipro.util.ValidationUtil.sanitizeLowerTrimToNull;
import static com.buildgrid.mandipro.util.ValidationUtil.sanitizeTrimToNull;
import static com.buildgrid.mandipro.util.ValidationUtil.validateOwnerAndManager;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirmInviteServiceImpl implements FirmInviteService {

    private final FirmInviteRepository firmInviteRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final FirmInviteMapper firmInviteMapper;
    private final UserMapper userMapper;
    private final EmailService emailService;
    private final InviteConfig inviteConfig;
    private final AuthService authService;

    @Override
    @Transactional
    public FirmInviteResponse sendInvite(FirmInviteCreateRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "firmInvite.sendInvite", TraceIdUtil.get());

        User inviter = getCurrentUserOrThrow();
        validateOwnerAndManager(inviter, "firmInvite.manage", "Only OWNER or MANAGER can manage invites");
        Long firmId = getFirmIdOrThrow(inviter);

        sanitizeInviteRequest(request);
        validateInviteRole(request.getRole());
        validateUniquenessForInvitation(request.getEmail(), request.getUsername(), firmId);

        String token = generateSecureToken();
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(inviteConfig.getExpiryHours());

        FirmInvite invite = firmInviteMapper.toInviteEntity(request, inviter.getFirm(), inviter, token, expiresAt);
        FirmInvite saved = firmInviteRepository.save(invite);
        
        sendInviteEmail(saved);

        log.info(LogMessages.FIRM_INVITE_SENT, saved.getEmail(), saved.getFirm().getId(), TraceIdUtil.get());
        log.info(LogMessages.OPERATION_COMPLETED, "firmInvite.sendInvite", TraceIdUtil.get());
        return buildInviteResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FirmInviteResponse> listInvites() {
        log.info(LogMessages.OPERATION_STARTED, "firmInvite.listInvites", TraceIdUtil.get());

        User currentUser = getCurrentUserOrThrow();
        validateOwnerAndManager(currentUser, "firmInvite.manage", "Only OWNER or MANAGER can manage invites");
        Long firmId = getFirmIdOrThrow(currentUser);

        List<FirmInviteResponse> responses = firmInviteRepository.findByFirm_IdOrderByCreatedAtDesc(firmId)
                .stream()
                .filter(invite -> invite.getStatus() == Status.ACTIVE)
                .map(this::buildInviteResponse)
                .toList();

        log.info(LogMessages.OPERATION_COMPLETED_WITH_COUNT, "firmInvite.listInvites", responses.size(), TraceIdUtil.get());
        return responses;
    }

    @Override
    @Transactional
    public void cancelInvite(UUID inviteId) {
        log.info(LogMessages.OPERATION_STARTED, "firmInvite.cancelInvite", TraceIdUtil.get());

        User currentUser = getCurrentUserOrThrow();
        validateOwnerAndManager(currentUser, "firmInvite.manage", "Only OWNER or MANAGER can manage invites");
        Long firmId = getFirmIdOrThrow(currentUser);

        FirmInvite invite = getInviteOrThrow(firmId, inviteId);
        ensurePendingAndNotExpired(invite);

        invite.setInviteStatus(InviteStatus.CANCELLED);
        invite.setStatus(Status.CANCEL);
        invite.setToken(null);
        firmInviteRepository.save(invite);

        log.info(LogMessages.FIRM_INVITE_CANCELLED, invite.getId(), firmId, TraceIdUtil.get());
        log.info(LogMessages.OPERATION_COMPLETED, "firmInvite.cancelInvite", TraceIdUtil.get());
    }

    @Override
    @Transactional
    public FirmInviteResponse resendInvite(UUID inviteId) {
        log.info(LogMessages.OPERATION_STARTED, "firmInvite.resendInvite", TraceIdUtil.get());

        User currentUser = getCurrentUserOrThrow();
        validateOwnerAndManager(currentUser, "firmInvite.manage", "Only OWNER or MANAGER can manage invites");
        Long firmId = getFirmIdOrThrow(currentUser);

        FirmInvite invite = getInviteOrThrow(firmId, inviteId);
        ensurePendingAndNotExpired(invite);

        invite.setToken(generateSecureToken());
        invite.setExpiresAt(LocalDateTime.now().plusHours(inviteConfig.getExpiryHours()));
        invite.setInvitedByUser(currentUser);

        FirmInvite saved = firmInviteRepository.save(invite);
        sendInviteEmail(saved);

        log.info(LogMessages.FIRM_INVITE_RESENT, saved.getId(), firmId, TraceIdUtil.get());
        log.info(LogMessages.OPERATION_COMPLETED, "firmInvite.resendInvite", TraceIdUtil.get());
        return firmInviteMapper.toResponse(saved);
    }


    @Override
    @Transactional
    public InvitePreviewResponse previewInvite(String token) {
        log.info(LogMessages.OPERATION_STARTED, "firmInvite.previewInvite", TraceIdUtil.get());

        FirmInvite invite = getByTokenOrThrow(token);
        assertFirmActive(invite.getFirm(), "firmInvite.previewInvite");
        ensurePendingAndNotExpired(invite);

        InvitePreviewResponse response = firmInviteMapper.toPreviewResponse(invite);
        log.info(LogMessages.OPERATION_COMPLETED, "firmInvite.previewInvite", TraceIdUtil.get());
        return response;
    }

    @Override
    @Transactional
    public LoginResponse acceptInvite(AcceptInviteRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "firmInvite.acceptInvite", TraceIdUtil.get());

        sanitizeAcceptInviteRequest(request);

        FirmInvite invite = getByTokenOrThrow(request.getToken());
        assertFirmActive(invite.getFirm(), "firmInvite.acceptInvite");
        ensurePendingAndNotExpired(invite);

        if (userRepository.existsByEmail(invite.getEmail())) {
            throw new AppException("A user with this invite email already exists", HttpStatus.CONFLICT);
        }

        if (userRepository.existsByUsernameAndFirm_Id(invite.getUsername(), invite.getFirm().getId())) {
            throw new AppException("A user with this invite username already exists in the firm", HttpStatus.CONFLICT);
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        var role = roleRepository.findByName(invite.getRole().name())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + invite.getRole()));

        User user = firmInviteMapper.toUserEntity(invite, request, encodedPassword, role);

        User savedUser = userRepository.save(user);

        invite.setInviteStatus(InviteStatus.ACCEPTED);
        invite.setToken(null);
        invite.setStatus(Status.CANCEL);
        firmInviteRepository.save(invite);
        log.info(LogMessages.FIRM_INVITE_ACCEPTED, invite.getEmail(), invite.getFirm().getId(), TraceIdUtil.get());

        // Login user
        LoginRequest loginRequest = LoginRequest.builder()
                .email(invite.getEmail())
                .password(request.getPassword())
                .build();
        LoginResponse loginResponse = authService.login(loginRequest);

        log.info(LogMessages.OPERATION_COMPLETED, "firmInvite.acceptInvite", TraceIdUtil.get());
        return loginResponse;
    }

    private void sanitizeInviteRequest(FirmInviteCreateRequest request) {
        request.setEmail(sanitizeLowerTrimToNull(request.getEmail()));
        request.setUsername(sanitizeTrimToNull(request.getUsername()));
    }

    private void sanitizeAcceptInviteRequest(AcceptInviteRequest request) {
        request.setToken(sanitizeTrimToNull(request.getToken()));
        request.setFirstName(sanitizeTrimToNull(request.getFirstName()));
        request.setLastName(sanitizeTrimToNull(request.getLastName()));
    }

    private void validateUniquenessForInvitation(String email, String username, Long firmId) {
        if (userRepository.existsByEmail(email)) {
            throw new AppException("Email already in use", HttpStatus.CONFLICT);
        }

        if (firmInviteRepository.existsByEmail(email)) {
            throw new AppException("An invite already exists for this email", HttpStatus.CONFLICT);
        }

        if (userRepository.existsByUsernameAndFirm_Id(username, firmId)
                || firmInviteRepository.existsByUsernameAndFirm_Id(username, firmId)) {
            throw new AppException("Username already in use within this firm", HttpStatus.CONFLICT);
        }
    }

    private void validateInviteRole(RoleConstants role) {
        if (role != RoleConstants.MANAGER && role != RoleConstants.EMPLOYEE) {
            throw new AppException("Role must be MANAGER or EMPLOYEE", HttpStatus.BAD_REQUEST);
        }
    }

    private Long getFirmIdOrThrow(User currentUser) {
        Firm firm = currentUser.getFirm();
        if (firm == null) {
            throw new AppException("Authenticated user is not associated with a firm", HttpStatus.FORBIDDEN);
        }

        assertFirmActive(firm, "firmInvite.access");
        return firm.getId();
    }

    private FirmInvite getInviteOrThrow(Long firmId, UUID inviteId) {
        return firmInviteRepository.findByIdAndFirm_Id(inviteId, firmId)
                .orElseThrow(() -> new ResourceNotFoundException("Firm invite not found"));
    }

    private FirmInvite getByTokenOrThrow(String token) {
        return firmInviteRepository.findByToken(token)
                .orElseThrow(() -> new AppException("Invalid invitation token", HttpStatus.BAD_REQUEST));
    }

    private void ensurePendingAndNotExpired(FirmInvite invite) {
        if (invite.getInviteStatus() != InviteStatus.PENDING) {
            throw new AppException("Invitation is no longer active", HttpStatus.BAD_REQUEST);
        }

        if (invite.isExpired()) {
            invite.setInviteStatus(InviteStatus.EXPIRED);
            invite.setToken(null);
            firmInviteRepository.save(invite);
            throw new AppException("Invitation has expired", HttpStatus.BAD_REQUEST);
        }
    }

    private User getCurrentUserOrThrow() {
        String email = SecurityUtils.getCurrentUserEmail()
                .orElseThrow(() -> new AppException("Not authenticated", HttpStatus.UNAUTHORIZED));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        if (user.getFirm() != null) {
            assertFirmActive(user.getFirm(), "firmInvite.authenticatedAccess");
        }

        return user;
    }


    private String generateSecureToken() {
        byte[] bytes = new byte[32];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private FirmInviteResponse buildInviteResponse(FirmInvite invite) {
        String inviterName = StringUtils.defaultIfBlank(invite.getInvitedByUser().getFirstName(), invite.getInvitedByUser().getEmail());
        
        return FirmInviteResponse.builder()
                .id(invite.getId())
                .firmId(invite.getFirm().getId())
                .firmName(invite.getFirm().getName())
                .email(invite.getEmail())
                .username(invite.getUsername())
                .role(invite.getRole())
                .invitedByUserId(invite.getInvitedByUser().getId())
                .invitedByName(StringUtils.trimToNull(inviterName))
                .status(invite.getInviteStatus())
                .expiresAt(invite.getExpiresAt())
                .createdAt(invite.getCreatedAt())
                .build();
    }

    private void sendInviteEmail(FirmInvite invite) {
        String acceptLink = inviteConfig.getAcceptBaseUrl() + "?token=" + invite.getToken();

        String inviterName = StringUtils.defaultIfBlank(invite.getInvitedByUser().getFirstName(), invite.getInvitedByUser().getEmail());

        emailService.sendFirmInviteEmail(
                invite.getEmail(),
                invite.getFirm().getName(),
                invite.getRole().name(),
                inviterName,
                invite.getEmail(),
                invite.getExpiresAt(),
                acceptLink
        );
    }
}


