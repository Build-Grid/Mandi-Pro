import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
    fetchUserProfile,
    fetchFirmProfile,
    forgotPassword,
    login,
    logout,
    refreshToken,
    register,
    updateFirmProfile,
    deleteFirm,
    createInvite,
    resendInvite,
    fetchInvites,
    deleteInvite,
    fetchFirmUsers,
    fetchFirmUserById,
    updateUserRole,
    deleteFirmUser,
    updateUserProfile,
    previewInvite,
    acceptInvite,
    resetPassword,
} from "@/features/auth/api";
import type {
    AuthResponse,
    ForgotPasswordDto,
    ForgotPasswordResponse,
    LoginDto,
    RegisterDto,
} from "@/features/auth/types";
import type { User, Firm, Invite, ApiResponse } from "@/common/types";
import { handleGlobalError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { AppError } from "@/lib/errors";
import { useAuthStore } from "@/store/auth.store";
import { useDashboardStore } from "../dashboard/store";
import type { InvitePreview } from "@/common/types";

export function useLogin() {
    const router = useRouter();

    return useMutation<AuthResponse, Error, LoginDto>({
        mutationFn: login,
        onSuccess: (response) => {
            logger.info("Login successful:", response);
            router.push("/dashboard");
        },
        onError: (error) => {
            logger.error("Login failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useRegister() {
    const router = useRouter();

    return useMutation<AuthResponse, Error, RegisterDto>({
        mutationFn: register,
        onSuccess: (response) => {
            logger.info("Registration successful:", response);
            router.push("/dashboard");
        },
        onError: (error) => {
            logger.error("Registration failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useForgotPassword() {
    return useMutation<ForgotPasswordResponse, Error, ForgotPasswordDto>({
        mutationFn: forgotPassword,
        onSuccess: (response) => {
            logger.info("Password reset email sent:", response);
        },
        onError: (error) => {
            logger.error("Forgot password failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            useAuthStore.getState().clearToken();
            useDashboardStore.getState().reset();
            queryClient.clear();
            logger.info("Logout successful");
            router.replace("/login");
        },
        onError: (error) => {
            logger.error("Logout failed:", error);
            useAuthStore.getState().clearToken();
            useDashboardStore.getState().reset();
            router.replace("/login");
        },
    });
}

export function useUpdateFirm() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { firmName: string }) => updateFirmProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
        },
    });
}

export function useDeleteFirm() {
    const router = useRouter();

    return useMutation({
        mutationFn: () => deleteFirm(),
        onSuccess: () => {
            router.replace("/");
        },
    });
}

export function useInvites() {
    return useQuery({
        queryKey: ["firm", "invites"],
        queryFn: () => fetchInvites(),
        select: (res: ApiResponse<Invite[]>) => res.data,
    });
}

export function useCreateInvite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: {
            email: string;
            username: string;
            role: string;
        }) => createInvite(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["firm", "invites"] }),
    });
}

export function useResendInvite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (inviteId: string) => resendInvite(inviteId),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["firm", "invites"] }),
    });
}

export function useDeleteInvite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (inviteId: string) => deleteInvite(inviteId),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["firm", "invites"] }),
    });
}

export function useFirmUsers() {
    return useQuery({
        queryKey: ["firm", "users"],
        queryFn: fetchFirmUsers,
        select: (res) => res.data,
    });
}

export function useFirmUserDetail(userId: number | null) {
    return useQuery({
        queryKey: ["firm", "users", userId],
        queryFn: () => fetchFirmUserById(userId as number),
        select: (res) => res.data,
        enabled: userId !== null,
    });
}

export function useUpdateUserRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            role,
        }: {
            userId: number;
            role: User["role"];
        }) => updateUserRole(userId, { role }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["firm", "users"] });
            queryClient.invalidateQueries({
                queryKey: ["firm", "users", variables.userId],
            });
        },
    });
}

export function useDeleteFirmUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: number) => deleteFirmUser(userId),
        onSuccess: (_, userId) => {
            queryClient.invalidateQueries({ queryKey: ["firm", "users"] });
            queryClient.invalidateQueries({
                queryKey: ["firm", "users", userId],
            });
        },
        onError: (error) => {
            logger.error("Delete user failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useUpdateUserProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { firstName?: string; lastName?: string }) =>
            updateUserProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
        },
    });
}

export function usePreviewInvite(token?: string | null) {
    return useQuery({
        queryKey: ["invite", "preview", token],
        queryFn: () => previewInvite(token as string),
        select: (res: ApiResponse<InvitePreview>) => res.data,
        enabled: !!token,
        retry: false,
    });
}

export function useAcceptInvite() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (payload: {
            token: string;
            firstName: string;
            lastName: string;
            password: string;
        }) => acceptInvite(payload),
        onSuccess: (response) => {
            logger.info("Invite accepted:", response);
            queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
            // Redirect to dashboard - auth cookie should be set by backend
            router.replace("/dashboard");
        },
        onError: (error) => {
            logger.error("Accept invite failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useResetPassword() {
    const router = useRouter();

    return useMutation({
        mutationFn: (payload: { token: string; newPassword: string }) =>
            resetPassword(payload),
        onSuccess: () => {
            logger.info("Password reset successful");
            router.replace("/login");
        },
        onError: (error) => {
            logger.error("Reset password failed:", error);
            handleGlobalError(error);
        },
    });
}

export interface ProfileData {
    user: User;
    firm: Firm;
}

/**
 * Fetch and cache user and firm profile
 * Automatically refetch on window focus
 * Invalidates when disabled
 */
export function useProfile() {
    const router = useRouter();

    return useQuery<ProfileData, Error>({
        queryKey: ["user", "profile"],
        queryFn: async () => {
            try {
                const [userResponse, firmResponse] = await Promise.all([
                    fetchUserProfile(),
                    fetchFirmProfile(),
                ]);
                return {
                    user: userResponse.data,
                    firm: firmResponse.data,
                };
            } catch (error) {
                logger.error("Profile fetch failed:", error);

                // Check if it's token expiration
                if (
                    error instanceof AppError &&
                    (error.statusCode === 401 || error.statusCode === 403)
                ) {
                    logger.warn(
                        "Profile fetch unauthorized. Trying token refresh...",
                    );

                    try {
                        await refreshToken();
                        const [userResponse, firmResponse] = await Promise.all([
                            fetchUserProfile(),
                            fetchFirmProfile(),
                        ]);
                        return {
                            user: userResponse.data,
                            firm: firmResponse.data,
                        };
                    } catch (refreshError) {
                        logger.warn("Refresh failed, redirecting to login");
                        router.push("/login");
                        throw refreshError;
                    }
                }

                throw error;
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        retry: (failureCount, error) => {
            // Don't retry on 401/403
            if (
                error instanceof AppError &&
                (error.statusCode === 401 || error.statusCode === 403)
            ) {
                return false;
            }
            return failureCount < 3;
        },
    });
}

/**
 * Guard hook for login/register pages
 * Redirects to /dashboard if valid tokens exist
 * Returns loading state while checking
 */
export function useAuthGuard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Try to fetch profile with existing token
                await fetchUserProfile();
                logger.info(
                    "User already authenticated, redirecting to dashboard",
                );
                router.replace("/dashboard");
            } catch (error) {
                // If 401/403, try refreshing
                if (
                    error instanceof AppError &&
                    (error.statusCode === 401 || error.statusCode === 403)
                ) {
                    logger.info("Token expired, attempting refresh...");
                    try {
                        await refreshToken();
                        // Retry profile fetch after refresh
                        await fetchUserProfile();
                        logger.info(
                            "Token refreshed successfully, redirecting to dashboard",
                        );
                        router.replace("/dashboard");
                    } catch (refreshError) {
                        logger.info(
                            "Refresh failed, user can login manually:",
                            refreshError,
                        );
                        setIsLoading(false);
                    }
                } else {
                    // No token or other error - let user login
                    setIsLoading(false);
                }
            }
        };

        checkAuth();
    }, [router]);

    return { isLoading };
}
