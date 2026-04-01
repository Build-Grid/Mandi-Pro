import axios from "axios";

import { environmentConfig } from "~/config/env";
import {
    AUTH_SCHEME,
    ERROR_COPY,
    HTTP_HEADERS,
    HTTP_STATUS_CODES,
    STORAGE_KEYS,
} from "~/constants/errors";
import { store } from "~/store";
import { setGlobalError } from "~/store/slices/errorSlice";
import { normalizeApiError } from "~/utils/errorHandling";

export const httpClient = axios.create({
    baseURL: environmentConfig.apiBaseUrl,
    timeout: 15_000,
    headers: {
        [HTTP_HEADERS.contentType]: HTTP_HEADERS.applicationJson,
    },
});

httpClient.interceptors.request.use((config) => {
    // Token storage strategy can be replaced later with httpOnly cookie auth.
    const accessToken = localStorage.getItem(STORAGE_KEYS.accessToken);

    if (accessToken) {
        config.headers[HTTP_HEADERS.authorization] =
            `${AUTH_SCHEME.bearer} ${accessToken}`;
    }

    return config;
});

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const statusCode = error.response?.status as number | undefined;

        if (statusCode === HTTP_STATUS_CODES.unauthorized) {
            console.warn(ERROR_COPY.unauthorizedWarning);
        }

        store.dispatch(
            setGlobalError(normalizeApiError(statusCode, error.message)),
        );

        return Promise.reject(error);
    },
);
