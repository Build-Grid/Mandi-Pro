import { apiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";

import type {
    ForgotPasswordDto,
    ForgotPasswordResponse,
    LoginDto,
    AuthResponse,
    RefreshResponse,
    RegisterDto,
} from "@/features/auth/types";
import type { User, ApiResponse, Firm, Invite } from "@/common/types";
import type { InvitePreview } from "@/common/types";

export function login(data: LoginDto): Promise<AuthResponse> {
    logger.info("Login attempt for:", data.email);
    return apiClient<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/**
 * Fetch current user profile
 * Requires valid access token
 */
export function fetchUserProfile(): Promise<ApiResponse<User>> {
    logger.info("Fetching user profile");
    return apiClient<ApiResponse<User>>("/auth/me/profile");
}

export function updateUserProfile(data: {
    firstName?: string;
    lastName?: string;
}): Promise<ApiResponse<User>> {
    logger.info("Updating current user profile", data);
    return apiClient<ApiResponse<User>>("/auth/me/profile", {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

/**
 * Fetch current firm profile
 * Requires valid access token
 */
export function fetchFirmProfile(): Promise<ApiResponse<Firm>> {
    logger.info("Fetching firm profile");
    return apiClient<ApiResponse<Firm>>("/firm/profile/fetch");
}

export function updateFirmProfile(data: {
    firmName: string;
}): Promise<ApiResponse<null>> {
    logger.info("Updating firm profile", data);
    return apiClient<ApiResponse<null>>("/firm/profile", {
        method: "PUT",
        body: JSON.stringify({ firmName: data.firmName }),
    });
}

export function deleteFirm(): Promise<ApiResponse<null>> {
    logger.info("Deleting firm");
    return apiClient<ApiResponse<null>>("/firm/delete", {
        method: "DELETE",
    });
}

// Invites
export function createInvite(payload: {
    email: string;
    username: string;
    role: string;
}) {
    logger.info("Creating invite", payload);
    return apiClient<ApiResponse<Invite>>("/firm/invites", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function resendInvite(inviteId: string) {
    logger.info("Resending invite", inviteId);
    return apiClient<ApiResponse<Invite>>(`/firm/invites/${inviteId}/resend`, {
        method: "POST",
    });
}

export function fetchInvites() {
    logger.info("Fetching invites");
    return apiClient<ApiResponse<Invite[]>>("/firm/invites");
}

export function deleteInvite(inviteId: string) {
    logger.info("Deleting invite", inviteId);
    return apiClient<ApiResponse<null>>(`/firm/invites/${inviteId}`, {
        method: "DELETE",
    });
}

export function fetchFirmUsers(): Promise<ApiResponse<User[]>> {
    logger.info("Fetching firm users");
    return apiClient<ApiResponse<User[]>>("/firm/users");
}

export function fetchFirmUserById(
    userId: number | string,
): Promise<ApiResponse<User>> {
    logger.info("Fetching firm user by id", userId);
    return apiClient<ApiResponse<User>>(`/firm/user/${userId}`);
}

export function updateUserRole(
    userId: number | string,
    data: { role: User["role"] },
): Promise<ApiResponse<User>> {
    logger.info("Updating user role", { userId, role: data.role });
    return apiClient<ApiResponse<User>>(`/firm/user/${userId}/role`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteFirmUser(
    userId: number | string,
): Promise<ApiResponse<null>> {
    logger.info("Deleting firm user", userId);
    return apiClient<ApiResponse<null>>(`/firm/user/${userId}/delete`, {
        method: "DELETE",
    });
}

export function register(data: RegisterDto): Promise<AuthResponse> {
    logger.info("Registration attempt for:", data.email);
    return apiClient<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function refreshToken(): Promise<RefreshResponse> {
    logger.info("Refreshing access token");
    return apiClient<RefreshResponse>("/auth/refresh", {
        method: "POST",
    });
}

export function logout(): Promise<ApiResponse<null>> {
    logger.info("Logging out current user");
    return apiClient<ApiResponse<null>>("/auth/logout", {
        method: "POST",
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

/**
 * Preview an invite using a token (used on the accept-invite page)
 */
export function previewInvite(
    token: string,
): Promise<ApiResponse<InvitePreview>> {
    logger.info("Fetching invite preview for token", token);
    return apiClient<ApiResponse<InvitePreview>>(
        `/invites/preview?token=${encodeURIComponent(token)}`,
    );
}

/**
 * Accept an invitation and create the user
 */
export function acceptInvite(data: {
    token: string;
    firstName: string;
    lastName: string;
    password: string;
}): Promise<ApiResponse<User>> {
    logger.info("Accepting invite for token", data.token);
    return apiClient<ApiResponse<User>>("/auth/accept-invite", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/**
 * Reset password using token and new password
 */
export function resetPassword(data: { token: string; newPassword: string }) {
    logger.info("Resetting password for token", data.token);
    return apiClient<ApiResponse<null>>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
