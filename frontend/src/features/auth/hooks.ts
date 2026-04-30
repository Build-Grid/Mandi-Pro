import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { forgotPassword, login, register } from "@/features/auth/api";
import type {
    AuthResponse,
    ForgotPasswordDto,
    ForgotPasswordResponse,
    LoginDto,
    RegisterDto,
} from "@/features/auth/types";
import { handleGlobalError } from "@/lib/errors";
import { logger } from "@/lib/logger";

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
