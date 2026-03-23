package com.buildgrid.mandipro.constants;

public final class LogMessages {
    private LogMessages() {}

    public static final String FIRM_REGISTERED = "Firm registered: {} | traceId: {}";
    public static final String USER_REGISTERED = "User registered: {} | traceId: {}";
    public static final String USER_LOGIN_SUCCESS = "Login successful: {} | traceId: {}";
    public static final String USER_LOGIN_FAILED = "Login failed for: {} | traceId: {}";
    public static final String TOKEN_VALIDATED = "Token validated for: {} | traceId: {}";
    public static final String EXCEPTION_CAUGHT = "Exception [{}]: {} | traceId: {}";
    public static final String REQUEST_RECEIVED = "Request: {} {} | IP: {} | traceId: {}";
    public static final String FIRM_USER_CREATED = "Firm user created: {} | firmId: {} | traceId: {}";
    public static final String APP_STARTED = "MandiPro started | profile: {} | port: {} | version: {}";
}
