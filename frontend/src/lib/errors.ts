import { useAuthStore } from "@/store/auth.store";

import { logger } from "@/lib/logger";

export class AppError extends Error {
    statusCode: number;
    details?: unknown;

    constructor(message: string, statusCode: number, details?: unknown) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.details = details;
    }
}

export function handleGlobalError(error: unknown): void {
    logger.error(error);

    if (!(error instanceof AppError)) {
        return;
    }

    if (error.statusCode !== 401 || typeof window === "undefined") {
        return;
    }

    useAuthStore.getState().clearToken();
    window.location.replace("/login");
}
