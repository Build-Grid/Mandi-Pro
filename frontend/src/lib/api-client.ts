import { env } from "@/lib/env";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

type ApiClientOptions = RequestInit & {
    withCredentials?: boolean;
};

type ApiEnvelope<T> = {
    success: boolean;
    statusCode: number;
    message: string;
    traceId: string;
    timestamp: string;
    data: T;
};

type RefreshPayload = {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    bearerPrefix: string;
};

const AUTH_REFRESH_ENDPOINT = "/auth/refresh";

let refreshInFlight: Promise<boolean> | null = null;

const buildUrl = (endpoint: string) => {
    const normalizedBase = env.API_BASE_URL.replace(/\/+$/, "");
    const normalizedEndpoint = endpoint.replace(/^\/+/, "");

    return `${normalizedBase}/${normalizedEndpoint}`;
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
    if (response.status === 204) {
        return undefined;
    }

    const text = await response.text();

    if (!text) {
        return undefined;
    }

    try {
        return JSON.parse(text) as unknown;
    } catch {
        return text;
    }
};

const extractErrorMessage = (
    details: unknown,
    fallbackMessage: string,
): string => {
    if (typeof details === "string") {
        return details;
    }

    if (details && typeof details === "object" && "message" in details) {
        const message = (details as { message?: unknown }).message;

        if (typeof message === "string" && message.trim().length > 0) {
            return message;
        }
    }

    return fallbackMessage;
};

const shouldAttemptRefresh = (endpoint: string): boolean => {
    const normalizedEndpoint = endpoint.replace(/^\/+/, "");

    return normalizedEndpoint !== AUTH_REFRESH_ENDPOINT.replace(/^\/+/, "");
};

const tryRefreshSession = async (): Promise<boolean> => {
    if (refreshInFlight) {
        return refreshInFlight;
    }

    refreshInFlight = (async () => {
        const refreshUrl = buildUrl(AUTH_REFRESH_ENDPOINT);

        logger.info("Attempting token refresh", { url: refreshUrl });

        const refreshResponse = await fetch(refreshUrl, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const refreshPayload = (await parseResponseBody(refreshResponse)) as
            | ApiEnvelope<RefreshPayload>
            | undefined;

        if (!refreshResponse.ok || !refreshPayload?.success) {
            logger.warn("Token refresh failed", {
                status: refreshResponse.status,
                details: refreshPayload,
            });

            return false;
        }

        logger.info("Token refresh successful", {
            status: refreshResponse.status,
        });

        return true;
    })();

    try {
        return await refreshInFlight;
    } finally {
        refreshInFlight = null;
    }
};

export async function apiClient<T>(
    endpoint: string,
    options: ApiClientOptions = {},
): Promise<T> {
    const {
        withCredentials = true,
        headers: inputHeaders,
        ...requestInit
    } = options;
    const url = buildUrl(endpoint);
    const method = requestInit.method ?? "GET";

    const headers = new Headers(inputHeaders ?? {});
    // Only set Content-Type if body exists
    if (method !== "GET" && method !== "HEAD") {
        headers.set("Content-Type", "application/json");
    }
    logger.info("API request", { method, url });

    const response = await fetch(url, {
        ...requestInit,
        headers,
        credentials: withCredentials ? "include" : "omit",
    });

    const payload = await parseResponseBody(response);

    if (
        (response.status === 401 || response.status === 403) &&
        withCredentials &&
        shouldAttemptRefresh(endpoint)
    ) {
        const refreshed = await tryRefreshSession();

        if (refreshed) {
            const retryResponse = await fetch(url, {
                ...requestInit,
                headers,
                credentials: withCredentials ? "include" : "omit",
            });

            const retryPayload = await parseResponseBody(retryResponse);

            if (retryResponse.ok) {
                logger.info("API response after token refresh", {
                    method,
                    url,
                    status: retryResponse.status,
                    data: retryPayload,
                });

                return retryPayload as T;
            }

            const retryMessage = extractErrorMessage(
                retryPayload,
                `Request failed with status ${retryResponse.status}`,
            );

            logger.error("API error after token refresh", {
                method,
                url,
                status: retryResponse.status,
                details: retryPayload,
            });

            throw new AppError(
                retryMessage,
                retryResponse.status,
                retryPayload,
            );
        }
    }

    if (!response.ok) {
        const message = extractErrorMessage(
            payload,
            `Request failed with status ${response.status}`,
        );

        logger.error("API error", {
            method,
            url,
            status: response.status,
            details: payload,
        });

        throw new AppError(message, response.status, payload);
    }

    logger.info("API response", {
        method,
        url,
        status: response.status,
        data: payload,
    });

    return payload as T;
}
