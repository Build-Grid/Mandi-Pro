package com.buildgrid.mandipro.util;

import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.RoleConstants;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import java.util.regex.Pattern;

@Slf4j
public final class ValidationUtil {
    private ValidationUtil() {}

    private static final String EMAIL_PATTERN = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
    private static final Pattern PATTERN = Pattern.compile(EMAIL_PATTERN);

    public static boolean isValidEmail(String email) {
        if (email == null) return false;
        return PATTERN.matcher(email).matches();
    }

    public static boolean isNotBlank(String s) {
        return s != null && !s.trim().isEmpty();
    }

    public static boolean isValidUUID(String uuid) {
        if (uuid == null) return false;
        try {
            java.util.UUID.fromString(uuid);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public static void validateOwnerManager(User user) {
        RoleConstants role = RoleConstants.valueOf(user.getRole().getName());
        if (role != RoleConstants.OWNER && role != RoleConstants.MANAGER) {
            log.warn(LogMessages.OPERATION_FORBIDDEN, "firmInvite.manage", user.getEmail(), TraceIdUtil.get());
            throw new AppException("Only OWNER or MANAGER can manage invites", HttpStatus.FORBIDDEN);
        }
    }
}
