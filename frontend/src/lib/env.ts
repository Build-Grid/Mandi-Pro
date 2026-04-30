import { logger } from "./logger";

const requireEnv = (value: string | undefined, key: string): string => {
    if (!value) {
        if (typeof window === "undefined") {
            throw new Error(`Missing required environment variable: ${key}`);
        }
        logger.warn(`Missing env: ${key}`);
        return "";
    }

    return value;
};

export const env = {
    API_BASE_URL: requireEnv(
        process.env.NEXT_PUBLIC_API_BASE_URL,
        "NEXT_PUBLIC_API_BASE_URL",
    ),
    APP_ENV: process.env.NODE_ENV ?? "development",
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
} as const;
