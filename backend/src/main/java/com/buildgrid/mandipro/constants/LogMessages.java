package com.buildgrid.mandipro.constants;

public final class LogMessages {
    private LogMessages() {}

    public static final String OPERATION_STARTED = "{} started | traceId: {}";
    public static final String OPERATION_COMPLETED = "{} completed | traceId: {}";
    public static final String OPERATION_COMPLETED_WITH_COUNT = "{} completed | count: {} | traceId: {}";
    public static final String OPERATION_FORBIDDEN = "{} forbidden for user: {} | traceId: {}";
    public static final String FIRM_INACTIVE_BLOCKED = "Blocked {} because firmId={} is not active (status={}) | traceId: {}";

    public static final String FIRM_REGISTERED = "Firm registered: {} | traceId: {}";
    public static final String USER_REGISTERED = "User registered: {} | traceId: {}";
    public static final String AUTH_LOGIN_ATTEMPT = "Login attempt for: {} | traceId: {}";
    public static final String USER_LOGIN_SUCCESS = "Login successful: {} | traceId: {}";
    public static final String USER_LOGIN_FAILED = "Login failed for: {} | traceId: {}";
    public static final String TOKEN_REFRESH_REQUESTED = "Refresh token requested | traceId: {}";
    public static final String TOKEN_REFRESH_SUCCESS = "Refresh token successful for: {} | traceId: {}";
    public static final String USER_LOGOUT = "Logout completed | traceId: {}";
    public static final String TOKEN_VALIDATED = "Token validated for: {} | traceId: {}";
    public static final String EXCEPTION_CAUGHT = "Exception [{}]: {} | traceId: {}";
    public static final String REQUEST_RECEIVED = "Request: {} {} | IP: {} | traceId: {}";
    public static final String FIRM_USER_CREATED = "Firm user created: {} | firmId: {} | traceId: {}";
    public static final String APP_STARTED = "MandiPro started | profile: {} | port: {} | version: {}";
    public static final String PASSWORD_RESET_REQUESTED = "Password reset requested for: {} | traceId: {}";
    public static final String PASSWORD_RESET_SUCCESS = "Password reset successful for: {} | traceId: {}";

    public static final String FIRM_INVITE_SENT = "Firm invite sent to: {} | firmId: {} | traceId: {}";
    public static final String FIRM_INVITE_CANCELLED = "Firm invite cancelled: {} | firmId: {} | traceId: {}";
    public static final String FIRM_INVITE_RESENT = "Firm invite resent: {} | firmId: {} | traceId: {}";
    public static final String FIRM_INVITE_ACCEPTED = "Firm invite accepted by: {} | firmId: {} | traceId: {}";

    public static final String PASSWORD_RESET_EMAIL_SENT = "Password reset email sent to: {} | traceId: {}";
    public static final String PASSWORD_RESET_EMAIL_FAILED = "Failed to send password reset email to: {} | traceId: {}";
    public static final String FIRM_INVITE_EMAIL_SENT = "Firm invite email sent to: {} | traceId: {}";
    public static final String FIRM_INVITE_EMAIL_FAILED = "Failed to send firm invite email to: {} | traceId: {}";

    public static final String JWT_TOKEN_INVALID = "Invalid JWT token: {} | traceId: {}";
    public static final String JWT_AUTH_CONTEXT_FAILED = "Could not set user authentication in security context | traceId: {}";

    public static final String USER_PROFILE_UPDATED = "User profile updated for: {} | traceId: {}";
    public static final String USER_PASSWORD_CHANGED = "User password changed for: {} | traceId: {}";
    public static final String FIRM_PROFILE_UPDATED = "Firm profile updated for firmId: {} | traceId: {}";
    public static final String USER_ROLE_UPDATED = "User role updated for userId: {} | newRole: {} | traceId: {}";
}
