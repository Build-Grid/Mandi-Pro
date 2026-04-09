package com.buildgrid.mandipro.filter;

import com.buildgrid.mandipro.constants.AppConstants;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.util.RequestUtil;
import com.buildgrid.mandipro.util.TraceIdUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@Order(1)
public class TraceIdFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        String traceId = request.getHeader(AppConstants.HEADER_TRACE_ID);
        if (!StringUtils.hasText(traceId)) {
            traceId = TraceIdUtil.generate();
        } else {
            TraceIdUtil.set(traceId);
        }

        response.setHeader(AppConstants.HEADER_TRACE_ID, traceId);
        if (shouldLogRequest(request)) {
            log.info(LogMessages.REQUEST_RECEIVED,
                    request.getMethod(),
                    request.getRequestURI(),
                    RequestUtil.getClientIp(request),
                    TraceIdUtil.get());
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            TraceIdUtil.clear();
        }
    }

    private boolean shouldLogRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return !(uri.startsWith("/actuator") || uri.startsWith("/swagger") || uri.startsWith("/v3/api-docs"));
    }
}
