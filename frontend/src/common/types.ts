export type RoleConstants = "OWNER" | "ADMIN" | "MANAGER" | "EMPLOYEE";
export type InviteStatus = "PENDING" | "ACCEPTED" | "EXPIRED" | "CANCELLED";
export type PlanType = "STANDARD" | "ELITE";
export type Status = "ACTIVE" | "CANCEL";

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
    role: RoleConstants;
    firmId: number;
    status: Status;
    createdAt: string;
    updatedAt: string;
}

export interface Firm {
    id: number;
    name: string;
    ownerName: string;
    ownerEmail: string;
    planType: PlanType;
    createAt: string;
}

export interface Invite {
    id: string;
    firmId: number;
    firmName: string;
    email: string;
    username: string;
    role: RoleConstants;
    invitedByUserId: number;
    invitedByName: string;
    status: InviteStatus;
    expiresAt: string;
    createdAt: string;
}

export interface InvitePreview {
    firmName: string;
    email: string;
    role: RoleConstants;
    expiresAt: string;
}
