"use client";

import { useState } from "react";
import type { User } from "@/common/types";
import { CheckCircle2, Trash2, X } from "lucide-react";

export function UserProfileModal({
    currentUser,
    selectedUser,
    isLoading,
    onUpdateRole,
    onDeleteUser,
    onClose,
    isUpdating,
    isDeleting,
}: {
    currentUser: User;
    selectedUser?: User;
    isLoading: boolean;
    onUpdateRole: (role: User["role"]) => void;
    onDeleteUser: () => void;
    onClose: () => void;
    isUpdating: boolean;
    isDeleting: boolean;
}) {
    const [nextRole, setNextRole] = useState<User["role"]>(
        selectedUser?.role ?? "EMPLOYEE",
    );
    const isModifyingSelf = selectedUser?.id === currentUser.id;
    const roleUnchanged = Boolean(
        selectedUser && nextRole === selectedUser.role,
    );

    const availableRoles = (() => {
        if (currentUser.role === "OWNER")
            return ["MANAGER", "EMPLOYEE"] as User["role"][];
        if (currentUser.role === "MANAGER") {
            // Managers can promote EMPLOYEE -> MANAGER, but cannot demote MANAGER -> EMPLOYEE
            if (selectedUser?.role === "EMPLOYEE")
                return ["MANAGER"] as User["role"][];
            return [] as User["role"][];
        }
        return [] as User["role"][];
    })();

    const canModifySelectedUser =
        currentUser.role === "OWNER" || selectedUser?.role !== "OWNER";

    // Managers should not be able to modify other managers (no demote), owners are protected
    const canModifyManagerRole = !(
        currentUser.role === "MANAGER" && selectedUser?.role === "MANAGER"
    );

    const isButtonDisabled =
        isUpdating ||
        !selectedUser ||
        isModifyingSelf ||
        !canModifySelectedUser ||
        !canModifyManagerRole ||
        roleUnchanged ||
        !availableRoles.includes(nextRole) ||
        // Extra defensive check: managers cannot demote managers to employee
        (currentUser.role === "MANAGER" &&
            selectedUser?.role === "MANAGER" &&
            nextRole === "EMPLOYEE");

    const canDeleteSelectedUser = Boolean(
        selectedUser &&
        selectedUser.id !== currentUser.id &&
        (currentUser.role === "OWNER" ||
            (currentUser.role === "MANAGER" &&
                selectedUser.role === "EMPLOYEE")),
    );

    const deleteDisabledReason = isModifyingSelf
        ? "Self delete is not allowed"
        : currentUser.role === "MANAGER" &&
            selectedUser &&
            selectedUser.role !== "EMPLOYEE"
          ? "Managers can only delete employees"
          : currentUser.role !== "OWNER" && currentUser.role !== "MANAGER"
            ? "No permission to delete users"
            : undefined;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-stone-950/40 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full sm:max-w-md rounded-2xl sm:rounded-xl border border-stone-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:shadow-[0_24px_60px_rgba(0,0,0,0.22)] overflow-hidden"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-stone-200 p-6 bg-linear-to-r from-stone-50 to-white">
                    <h2 className="text-base font-semibold text-stone-900">
                        User profile
                    </h2>
                    <button
                        className="p-2 text-stone-500 hover:bg-stone-100 rounded-lg transition"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] sm:max-h-96 overflow-y-auto">
                    {isLoading || !selectedUser ? (
                        <div className="py-12 text-center">
                            <div className="h-2 w-16 bg-stone-200 rounded-full mx-auto mb-3 animate-pulse" />
                            <div className="h-2 w-24 bg-stone-100 rounded-full mx-auto animate-pulse" />
                        </div>
                    ) : (
                        <>
                            <div className="bg-linear-to-br from-blue-50 to-stone-50 rounded-lg p-4">
                                <div className="grid gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                                            Username
                                        </p>
                                        <p className="text-sm font-semibold text-stone-900">
                                            {selectedUser.username}
                                        </p>
                                    </div>
                                    <div className="h-px bg-stone-200" />
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                                            Email
                                        </p>
                                        <p className="text-sm font-semibold text-stone-900 break-all">
                                            {selectedUser.email}
                                        </p>
                                    </div>
                                    <div className="h-px bg-stone-200" />
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                                            Full name
                                        </p>
                                        <p className="text-sm font-semibold text-stone-900">
                                            {selectedUser.firstName ?? ""}{" "}
                                            {selectedUser.lastName ?? ""}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {isModifyingSelf ? (
                                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                                    <p className="text-xs font-semibold text-amber-900">
                                        Cannot modify your own role
                                    </p>
                                </div>
                            ) : !canModifySelectedUser ? (
                                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                                    <p className="text-xs font-semibold text-amber-900">
                                        Managers cannot modify owner roles
                                    </p>
                                </div>
                            ) : !canModifyManagerRole ? (
                                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                                    <p className="text-xs font-semibold text-amber-900">
                                        Managers cannot modify manager roles
                                    </p>
                                </div>
                            ) : availableRoles.length === 0 ? (
                                <div className="p-3 rounded-lg bg-stone-100 border border-stone-300">
                                    <p className="text-xs font-semibold text-stone-700">
                                        No permission to update roles
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2 block">
                                        Update role
                                    </label>
                                    <select
                                        value={nextRole}
                                        onChange={(event) =>
                                            setNextRole(
                                                event.target
                                                    .value as User["role"],
                                            )
                                        }
                                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-stone-200 bg-white text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                                    >
                                        {/* If the selected user's current role isn't selectable (e.g., manager can't change it),
                                         include it as a disabled option so the select has a matching value. */}
                                        {selectedUser.role &&
                                        !availableRoles.includes(
                                            selectedUser.role,
                                        ) ? (
                                            <option
                                                value={selectedUser.role}
                                                disabled
                                            >
                                                {selectedUser.role.charAt(0) +
                                                    selectedUser.role
                                                        .slice(1)
                                                        .toLowerCase()}
                                            </option>
                                        ) : null}

                                        {availableRoles.map((role) => (
                                            <option key={role} value={role}>
                                                {role.charAt(0) +
                                                    role.slice(1).toLowerCase()}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="border-t border-stone-200 p-6 bg-stone-50/50 space-y-3">
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 transition"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => onUpdateRole(nextRole)}
                            disabled={isButtonDisabled}
                            title={
                                isModifyingSelf
                                    ? "Cannot modify your own role"
                                    : roleUnchanged
                                      ? "Select a different role"
                                      : undefined
                            }
                            className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            {isUpdating ? "Saving..." : "Update role"}
                        </button>
                    </div>

                    <button
                        onClick={onDeleteUser}
                        disabled={!canDeleteSelectedUser || isDeleting}
                        title={deleteDisabledReason}
                        className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
                            canDeleteSelectedUser
                                ? "bg-red-600 text-white hover:bg-red-700 border border-red-600"
                                : "bg-white text-red-600 border border-red-400"
                        } disabled:cursor-not-allowed`}
                    >
                        <Trash2 className="h-4 w-4" />
                        {isDeleting ? "Deleting..." : "Delete user"}
                    </button>
                </div>
            </div>
        </div>
    );
}
