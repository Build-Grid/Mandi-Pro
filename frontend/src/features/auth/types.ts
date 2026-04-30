import { ApiResponse, User } from "@/common/types";

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    firmName: string;
    username: string;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

export interface ForgotPasswordDto {
    email: string;
}

export interface AuthData {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    bearerPrefix: string;
    user: User;
}

export type AuthResponse = ApiResponse<AuthData>;

export interface ForgotPasswordResponse {
    message: string;
}
