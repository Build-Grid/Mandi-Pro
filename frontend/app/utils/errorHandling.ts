import { ERROR_COPY, ERROR_SOURCES } from "~/constants/errors";

import type { ErrorSource } from "~/store/slices/errorSlice";

interface NormalizedError {
    source: ErrorSource;
    message: string;
    details?: string;
}

export function normalizeRuntimeError(error: ErrorEvent): NormalizedError {
    const fallbackMessage = error.message || ERROR_COPY.unknownRuntimeError;

    return {
        source: ERROR_SOURCES.runtime,
        message: fallbackMessage,
        details: `${ERROR_COPY.runtimeErrorSource}: ${fallbackMessage}`,
    };
}

export function normalizeUnhandledRejection(
    event: PromiseRejectionEvent,
): NormalizedError {
    const reason = event.reason;
    const message =
        reason instanceof Error
            ? reason.message
            : String(reason ?? ERROR_COPY.unknownUnhandledRejection);

    return {
        source: ERROR_SOURCES.unhandledRejection,
        message,
        details: `${ERROR_COPY.promiseRejectionSource}: ${message}`,
    };
}

export function normalizeApiError(
    statusCode?: number,
    message?: string,
): NormalizedError {
    const normalizedMessage = message || ERROR_COPY.fallbackDetails;

    return {
        source: ERROR_SOURCES.network,
        message: normalizedMessage,
        details: `${ERROR_COPY.networkErrorSource}${statusCode ? ` (${statusCode})` : ""}: ${normalizedMessage}`,
    };
}
