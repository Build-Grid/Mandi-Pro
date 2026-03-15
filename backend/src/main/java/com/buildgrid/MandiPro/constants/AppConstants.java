package com.buildgrid.mandipro.constants;

public final class AppConstants {
    private AppConstants() {}

    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final int MAX_PAGE_SIZE = 100;
    public static final int DEFAULT_PAGE_NUMBER = 0;
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String HEADER_TRACE_ID = "X-Trace-Id";
    public static final String MDC_TRACE_ID_KEY = "traceId";
    public static final String ROLE_PREFIX = "ROLE_";
    public static final String DATE_FORMAT_DEFAULT = "yyyy-MM-dd";
    public static final String DATETIME_FORMAT_DEFAULT = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    public static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    public static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
}
