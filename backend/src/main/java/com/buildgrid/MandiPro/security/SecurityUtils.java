package com.buildgrid.mandipro.security;

import com.buildgrid.mandipro.constants.RoleConstants;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public final class SecurityUtils {
    private SecurityUtils() {}

    public static Optional<String> getCurrentUserEmail() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
                .map(authentication -> {
                    if (authentication.getPrincipal() instanceof UserDetails userDetails) {
                        return userDetails.getUsername();
                    } else if (authentication.getPrincipal() instanceof String principal) {
                        return principal;
                    }
                    return null;
                });
    }

    public static Set<String> getCurrentUserRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) return Set.of();
        return authentication.getAuthorities().stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .collect(Collectors.toSet());
    }

    public static boolean isAdmin() {
        return getCurrentUserRoles().contains(RoleConstants.ADMIN);
    }
}
