package com.buildgrid.mandipro.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.util.SerializationUtils;
import org.springframework.util.StringUtils;

import java.util.Base64;
import java.util.Optional;

public class CookieUtils {

    public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    return Optional.of(cookie);
                }
            }
        }

        return Optional.empty();
    }

    public static void addCookie(HttpServletResponse response,
                                 String name,
                                 String value,
                                 long maxAgeSeconds,
                                 boolean httpOnly,
                                 boolean secure,
                                 String sameSite,
                                 String domain,
                                 String path) {
        ResponseCookie.ResponseCookieBuilder builder = ResponseCookie.from(name, value)
                .path("/")
                .maxAge(maxAgeSeconds)
                .httpOnly(httpOnly)
                .secure(secure)
                .sameSite(sameSite);

        if (StringUtils.hasText(domain)) {
            builder.domain(domain);
        }
        if (StringUtils.hasText(path)) {
            builder.path(path);
        }

        ResponseCookie cookie = builder.build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    public static void deleteCookie(HttpServletRequest request,
                                    HttpServletResponse response,
                                    String name,
                                    boolean httpOnly,
                                    boolean secure,
                                    String sameSite,
                                    String domain,
                                    String path) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    ResponseCookie.ResponseCookieBuilder builder = ResponseCookie.from(name, "")
                            .path("/")
                            .maxAge(0)
                            .httpOnly(httpOnly)
                            .secure(secure)
                            .sameSite(sameSite);

                    if (StringUtils.hasText(domain)) {
                        builder.domain(domain);
                    }
                    if (StringUtils.hasText(path)) {
                        builder.path(path);
                    }

                    ResponseCookie deleteCookie = builder.build();
                    response.addHeader("Set-Cookie", deleteCookie.toString());
                }
            }
        }
    }

    public static String serialize(Object object) {
        return Base64.getUrlEncoder()
                .encodeToString(SerializationUtils.serialize(object));
    }

    public static <T> T deserialize(Cookie cookie, Class<T> cls) {
        return cls.cast(SerializationUtils.deserialize(
                Base64.getUrlDecoder().decode(cookie.getValue())));
    }
}
