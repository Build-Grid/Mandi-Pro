package com.buildgrid.mandipro.service.auth;

import com.buildgrid.mandipro.security.JwtTokenProvider;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthFlowService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public Authentication authenticate(String email, String password) {
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
    }

    public AuthTokens issueTokens(Authentication authentication) {
        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);
        return new AuthTokens(accessToken, refreshToken);
    }

    public String issueAccessToken(Authentication authentication) {
        return tokenProvider.generateAccessToken(authentication);
    }

    public UsernamePasswordAuthenticationToken buildAuthentication(UserDetails userDetails) {
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Getter
    @RequiredArgsConstructor
    public static class AuthTokens {
        private final String accessToken;
        private final String refreshToken;
    }
}

