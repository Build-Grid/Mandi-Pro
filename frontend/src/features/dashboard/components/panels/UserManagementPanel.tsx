"use client";

import { useState } from "react";
import type { Invite, User } from "@/common/types";
import {
    useCreateInvite,
    useDeleteInvite,
    useFirmUserDetail,
    useFirmUsers,
    useInvites,
    useResendInvite,
    useDeleteFirmUser,
    useUpdateUserRole,
} from "@/features/auth/hooks";
import { AlertCircle, Mail, Send, UserPlus, Users } from "lucide-react";
import { UserProfileModal } from "./UserProfileModal";

export function UserManagementPanel({ currentUser }: { currentUser: User }) {
    const invitesQuery = useInvites();
    const usersQuery = useFirmUsers();
    const { mutate: createInviteMut, isPending: creatingInvite } =
        useCreateInvite();
    const { mutate: resendInviteMut, isPending: resendingInvite } =
        useResendInvite();
    const { mutate: deleteInviteMut, isPending: deletingInvite } =
        useDeleteInvite();
    const { mutate: updateUserRoleMut, isPending: updatingUserRole } =
        useUpdateUserRole();
    const { mutate: deleteUserMut, isPending: deletingUser } =
        useDeleteFirmUser();

    const invites: Invite[] = invitesQuery.data ?? [];
    const users: User[] = usersQuery.data ?? [];

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const selectedUserQuery = useFirmUserDetail(selectedUserId);
    const selectedUser =
        selectedUserQuery.data ??
        users.find((entry) => entry.id === selectedUserId);

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-emerald-700" />
                            <h2 className="text-lg font-semibold text-stone-900">
                                Team management
                            </h2>
                        </div>
                        <p className="mt-1 text-sm text-stone-500">
                            Invite staff members and manage team access to the
                            platform.
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-1 lg:grid-cols-12">
                    <section className="lg:col-span-4 rounded-xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <UserPlus className="h-4 w-4 text-emerald-600" />
                            <h3 className="text-sm font-semibold text-stone-900">
                                Invite user
                            </h3>
                        </div>
                        <p className="text-xs text-stone-500 mb-4">
                            Send a team invitation with role assignment.
                        </p>
                        <InviteForm
                            onSubmit={(payload) => createInviteMut(payload)}
                            loading={creatingInvite}
                        />
                    </section>

                    <section className="lg:col-span-4 rounded-xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <Mail className="h-4 w-4 text-amber-600" />
                            <h3 className="text-sm font-semibold text-stone-900">
                                Pending invites
                            </h3>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {invitesQuery.isLoading ? (
                                <div className="py-8 text-center text-xs text-stone-500">
                                    Loading...
                                </div>
                            ) : invites.length === 0 ? (
                                <div className="py-6 text-center text-xs text-stone-500">
                                    <AlertCircle className="h-4 w-4 mx-auto mb-2 opacity-40" />
                                    No pending invites
                                </div>
                            ) : (
                                invites.map((inv) => (
                                    <div
                                        key={String(inv.id)}
                                        className="flex items-center justify-between gap-2 rounded-lg border border-stone-200 bg-stone-50/50 p-3 hover:bg-stone-100/50 transition"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-medium text-stone-900">
                                                {inv.email}
                                            </p>
                                            <p className="text-[11px] text-stone-500">
                                                {inv.role}
                                            </p>
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() =>
                                                    resendInviteMut(
                                                        String(inv.id),
                                                    )
                                                }
                                                disabled={resendingInvite}
                                                className="px-2 py-1 text-[10px] font-medium rounded border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition disabled:opacity-50"
                                            >
                                                Resend
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteInviteMut(
                                                        String(inv.id),
                                                    )
                                                }
                                                disabled={deletingInvite}
                                                className="px-2 py-1 text-[10px] font-medium rounded border border-stone-300 text-stone-600 bg-stone-50 hover:bg-stone-100 transition disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    <section className="lg:col-span-4 rounded-xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="h-4 w-4 text-blue-600" />
                            <h3 className="text-sm font-semibold text-stone-900">
                                Team members
                            </h3>
                            <span className="ml-auto text-xs font-medium text-stone-500 bg-stone-100 rounded-full px-2 py-0.5">
                                {users.length}
                            </span>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {usersQuery.isLoading ? (
                                <div className="py-8 text-center text-xs text-stone-500">
                                    Loading...
                                </div>
                            ) : users.length === 0 ? (
                                <div className="py-6 text-center text-xs text-stone-500">
                                    <Users className="h-4 w-4 mx-auto mb-2 opacity-40" />
                                    No team members
                                </div>
                            ) : (
                                users.map((entry) => (
                                    <button
                                        key={entry.id}
                                        onClick={() =>
                                            setSelectedUserId(entry.id)
                                        }
                                        className="w-full flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-stone-50/50 p-3 text-left hover:border-blue-300 hover:bg-blue-50/40 transition group"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-medium text-stone-900 group-hover:text-blue-900">
                                                {`${entry.firstName ?? ""} ${entry.lastName ?? ""}`.trim() ||
                                                    entry.username}
                                            </p>
                                            <p className="truncate text-[11px] text-stone-500">
                                                {entry.email}
                                            </p>
                                        </div>
                                        <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-stone-200 text-stone-700 shrink-0">
                                            {entry.role}
                                        </span>
                                    </button>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </div>

            {selectedUserId !== null && selectedUser ? (
                <UserProfileModal
                    key={selectedUser.id}
                    currentUser={currentUser}
                    selectedUser={selectedUser}
                    isLoading={
                        selectedUserQuery.isLoading && !selectedUserQuery.data
                    }
                    onUpdateRole={(role) => {
                        updateUserRoleMut(
                            {
                                userId: selectedUser.id,
                                role,
                            },
                            {
                                onSuccess: () => setSelectedUserId(null),
                            },
                        );
                    }}
                    onDeleteUser={() => {
                        deleteUserMut(selectedUser.id, {
                            onSuccess: () => setSelectedUserId(null),
                        });
                    }}
                    onClose={() => setSelectedUserId(null)}
                    isUpdating={updatingUserRole}
                    isDeleting={deletingUser}
                />
            ) : null}
        </>
    );
}

function InviteForm({
    onSubmit,
    loading,
}: {
    onSubmit: (p: { email: string; username: string; role: string }) => void;
    loading?: boolean;
}) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("MANAGER");

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit({
                    email: email.trim(),
                    username: username.trim(),
                    role,
                });
                setEmail("");
                setUsername("");
                setRole("MANAGER");
            }}
            className="space-y-3"
        >
            <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                    Email
                </label>
                <input
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="user@example.com"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>
            <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                    Username
                </label>
                <input
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="atom_atharva"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
            </div>
            <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                    Role
                </label>
                <select
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                >
                    <option value="MANAGER">Manager</option>
                    <option value="EMPLOYEE">Employee</option>
                </select>
            </div>
            <button
                className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                disabled={
                    loading ||
                    email.trim().length === 0 ||
                    username.trim().length === 0
                }
            >
                <Send className="h-4 w-4" />
                {loading ? "Sending..." : "Send invite"}
            </button>
        </form>
    );
}
