import { apiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";

import type {
    ForgotPasswordDto,
    ForgotPasswordResponse,
    LoginDto,
    AuthResponse,
    RegisterDto,
} from "@/features/auth/types";

export function login(data: LoginDto): Promise<AuthResponse> {
    logger.info("Login attempt for:", data.email);
    return apiClient<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function register(data: RegisterDto): Promise<AuthResponse> {
    logger.info("Registration attempt for:", data.email);
    return apiClient<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function forgotPassword(
    data: ForgotPasswordDto,
): Promise<ForgotPasswordResponse> {
    logger.info("Password reset requested for:", data.email);
    return apiClient<ForgotPasswordResponse>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
