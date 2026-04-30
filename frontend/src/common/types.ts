export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    traceId: string;
    timestamp: string;
    data: T;
}

export interface User {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    role: "OWNER" | "ADMIN" | "MANAGER" | "EMPLOYEE";
    firmId: number;
    status: "ACTIVE" | "CANCEL";
    createdAt: string;
    updatedAt: string;
}
