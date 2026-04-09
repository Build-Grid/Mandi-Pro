package com.buildgrid.mandipro.util;

import com.buildgrid.mandipro.constants.AppConstants;
import org.slf4j.MDC;

import java.util.UUID;

public final class TraceIdUtil {
    private TraceIdUtil() {}

    public static String generate() {
        String traceId = UUID.randomUUID().toString();
        set(traceId);
        return traceId;
    }

    public static String get() {
        return MDC.get(AppConstants.MDC_TRACE_ID_KEY);
    }

    public static void set(String traceId) {
        MDC.put(AppConstants.MDC_TRACE_ID_KEY, traceId);
    }

    public static void clear() {
        MDC.remove(AppConstants.MDC_TRACE_ID_KEY);
    }
}
