package com.buildgrid.mandipro.util;

import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.RoleConstants;
import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.entity.Firm;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
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

    public static void validateOwnerAndManager(User user, String operationName, String forbiddenMessage) {
        RoleConstants role = RoleConstants.valueOf(user.getRole().getName());
        if (role != RoleConstants.OWNER && role != RoleConstants.MANAGER) {
            log.warn(LogMessages.OPERATION_FORBIDDEN, operationName, user.getEmail(), TraceIdUtil.get());
            throw new AppException(forbiddenMessage, HttpStatus.FORBIDDEN);
        }
    }


    public static void assertFirmActive(Firm firm, String operationName) {
        if (firm.getStatus() != Status.ACTIVE) {
            log.warn(LogMessages.FIRM_INACTIVE_BLOCKED,
                    operationName,
                    firm.getId(),
                    firm.getStatus(),
                    TraceIdUtil.get());
            throw new AppException("Firm is no longer active", HttpStatus.FORBIDDEN);
        }
    }

    public static String sanitizeTrimToNull(String value) {
        return StringUtils.trimToNull(value);
    }

    public static String sanitizeLowerTrimToNull(String value) {
        return StringUtils.trimToNull(StringUtils.lowerCase(value));
    }

}
