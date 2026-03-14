package com.buildgrid.mandipro.constants;

public final class ApiPaths {
    private ApiPaths() {}

    public static final String BASE = "/api/v1";
    public static final String AUTH = BASE + "/auth";
    public static final String AUTH_LOGIN = AUTH + "/login";
    public static final String AUTH_REGISTER = AUTH + "/register";
    public static final String AUTH_REFRESH = AUTH + "/refresh";
    public static final String AUTH_LOGOUT = AUTH + "/logout";
    public static final String HEALTH = BASE + "/health";
}
