package com.buildgrid.mandipro.constants;

public final class ApiPaths {
    private ApiPaths() {}

    public static final String BASE = "/api/v1";
    public static final String AUTH = BASE + "/auth";
    public static final String AUTH_LOGIN = "/login";
    public static final String AUTH_REGISTER = "/register";
    public static final String AUTH_REFRESH = "/refresh";
    public static final String AUTH_LOGOUT = "/logout";
    public static final String HEALTH = BASE + "/health";
    public static final String ADMIN = BASE + "/admin";
    public static final String FIRM = BASE + "/firm";
}
