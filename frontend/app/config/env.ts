type AppEnvironment = "development" | "production";

const appEnvironment =
    (import.meta.env.VITE_APP_ENV as AppEnvironment | undefined) ??
    (import.meta.env.DEV ? "development" : "production");

const apiProtocol = import.meta.env.VITE_API_PROTOCOL ?? "http";
const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1";

export const environmentConfig = {
    appEnvironment,
    apiBaseUrl,
    useHttps: apiProtocol === "https",
};
