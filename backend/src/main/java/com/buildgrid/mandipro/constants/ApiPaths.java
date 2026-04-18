package com.buildgrid.mandipro.constants;

public final class ApiPaths {
    private ApiPaths() {}

    public static final String BASE = "/api/v1";
    public static final String AUTH = BASE + "/auth";
    public static final String AUTH_LOGIN = "/login";
    public static final String AUTH_REGISTER = "/register";
    public static final String AUTH_REFRESH = "/refresh";
    public static final String AUTH_LOGOUT = "/logout";
    public static final String AUTH_FORGOT_PASSWORD = "/forgot-password";
    public static final String AUTH_RESET_PASSWORD = "/reset-password";
    public static final String AUTH_ACCEPT_INVITE = "/accept-invite";
    public static final String AUTH_ME_PROFILE = "/me/profile";
    public static final String AUTH_ME_CHANGE_PASSWORD = "/me/change-password";
    public static final String HEALTH = BASE + "/health";
    public static final String ADMIN = BASE + "/admin";
    public static final String FIRM = BASE + "/firm";
    public static final String FIRM_USERS = "/users";
    public static final String FIRM_USER = "/user/{userId}";
    public static final String FIRM_USER_DELETE = "/user/{userId}/delete";
    public static final String FIRM_PROFILE = "/profile";
    public static final String FIRM_PROFILE_FETCH = "/profile/fetch";
    public static final String FIRM_USER_ROLE = "/user/{userId}/role";
    public static final String FIRM_DELETE = "/delete";

    public static final String FIRM_INVITES = "/invites";
    public static final String FIRM_INVITE_BY_ID = "/invites/{inviteId}";
    public static final String FIRM_INVITE_RESEND = "/invites/{inviteId}/resend";

    public static final String INVITES = BASE + "/invites";
    public static final String INVITES_PREVIEW = "/preview";

    public static final String COMMODITY_TYPE = BASE + "/commodity-type";
    public static final String COMMODITY_TYPE_CREATE = "/create";
    public static final String COMMODITY_TYPE_DELETE = "/delete/{id}";
    public static final String COMMODITY_TYPE_UPDATE = "/update";
    public static final String COMMODITY_TYPE_FETCH = "/fetch/{id}";
    public static final String COMMODITY_TYPE_FETCH_ALL = "/fetch";
}
