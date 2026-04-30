import { env } from "@/lib/env";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

type ApiClientOptions = RequestInit & {
    withCredentials?: boolean;
};

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
    const headers = new Headers(inputHeaders ?? {});

    headers.set("Content-Type", "application/json");

    const method = requestInit.method ?? "GET";

    logger.info("API request", { method, url });

    const response = await fetch(url, {
        ...requestInit,
        headers,
        credentials: withCredentials ? "include" : "omit",
    });

    const payload = await parseResponseBody(response);

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
