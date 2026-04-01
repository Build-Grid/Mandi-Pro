export const ERROR_COPY = {
    fallbackMessage: "Oops!",
    fallbackDetails: "An unexpected error occurred.",
    notFoundMessage: "404",
    routeErrorMessage: "Error",
    notFoundDetails: "The requested page could not be found.",
    bannerTitle: "Something went wrong",
    closeAction: "Dismiss",
    unauthorizedWarning:
        "Unauthorized request. Redirect user to login when auth is ready.",
    unknownRuntimeError: "Unknown runtime error",
    unknownUnhandledRejection: "Unhandled promise rejection",
    runtimeErrorSource: "Runtime Error",
    promiseRejectionSource: "Unhandled Rejection",
    networkErrorSource: "Network Error",
};

export const HTTP_STATUS_CODES = {
    unauthorized: 401,
    notFound: 404,
} as const;

export const ERROR_SOURCES = {
    runtime: "runtime",
    unhandledRejection: "unhandledRejection",
    network: "network",
    routeBoundary: "routeBoundary",
} as const;

export const STORAGE_KEYS = {
    accessToken: "access_token",
} as const;

export const HTTP_HEADERS = {
    contentType: "Content-Type",
    applicationJson: "application/json",
    authorization: "Authorization",
} as const;

export const AUTH_SCHEME = {
    bearer: "Bearer",
} as const;
