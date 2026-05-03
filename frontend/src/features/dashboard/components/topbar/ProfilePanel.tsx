"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
    ArrowLeft,
    AlertCircle,
    Building2,
    CheckCircle2,
    LogOut,
    Users,
    Zap,
} from "lucide-react";
import { useUpdateUserProfile } from "@/features/auth/hooks";
import type { User } from "@/common/types";

type Props = {
    user: User;
    onNavigate: (id: string) => void;
    onLogout: () => void;
    isLoggingOut: boolean;
    onClose: () => void;
};

type ProfileEditHandle = {
    save: () => void;
};

export default function ProfilePanel({
    user,
    onNavigate,
    onLogout,
    isLoggingOut,
    onClose,
}: Props) {
    const [panelView, setPanelView] = useState<"menu" | "profile" | "edit">(
        "menu",
    );
    const [successMessage, setSuccessMessage] = useState("");
    const editSaveRef = useRef<ProfileEditHandle | null>(null);

    const fullName =
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
        user.username;
    const initials = user.firstName
        ? user.firstName.charAt(0) +
          (user.lastName ? user.lastName.charAt(0) : "")
        : user.username.slice(0, 2).toUpperCase();

    const isAdminRole = ["OWNER", "MANAGER"].includes(user.role);

    const handleClose = () => {
        setPanelView("menu");
        onClose();
    };

    return (
        <div
            style={{
                position: "absolute",
                right: "1rem",
                top: "calc(100% + 0.5rem)",
                width: "288px",
                maxHeight: "min(520px, calc(100vh - 72px - 1rem))",
                display: "flex",
                flexDirection: "column",
                zIndex: 50,
                borderRadius: "16px",
                overflow: "hidden",
            }}
            className="border border-stone-200 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] animate-in fade-in slide-in-from-top-2 duration-200"
        >
            <div
                style={{ flexShrink: 0 }}
                className="bg-linear-to-r from-[#1a7a54] to-[#0c5238] px-6 py-4 text-white"
            >
                <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-xs font-bold">
                            {initials}
                        </div>
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-300 ring-2 ring-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">
                            {fullName}
                        </p>
                        <p className="text-[11px] text-emerald-100 truncate">
                            {user.role}
                        </p>
                    </div>
                </div>
            </div>

            {(panelView === "profile" || panelView === "edit") && (
                <div className="shrink-0 border-b border-stone-200 px-4 py-3 flex items-center gap-2">
                    <button
                        onClick={() =>
                            panelView === "edit"
                                ? setPanelView("profile")
                                : setPanelView("menu")
                        }
                        className="p-1.5 text-stone-600 hover:bg-stone-100 rounded-lg transition"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <h3 className="text-sm font-semibold text-stone-900">
                        {panelView === "profile"
                            ? "Profile Details"
                            : "Edit Profile"}
                    </h3>
                </div>
            )}

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    overscrollBehavior: "contain",
                }}
                className="overflow-hidden"
            >
                {panelView === "menu" && (
                    <>
                        <div className="border-b border-stone-200 p-1">
                            <button
                                onClick={() => setPanelView("profile")}
                                className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm text-stone-700 transition hover:bg-stone-50"
                            >
                                <Users className="h-4 w-4 shrink-0 text-stone-600" />
                                <span className="font-medium">My Profile</span>
                            </button>

                            {isAdminRole && (
                                <>
                                    <button
                                        onClick={() => {
                                            onNavigate("admin-users");
                                            handleClose();
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm text-stone-700 transition hover:bg-stone-50"
                                    >
                                        <Zap className="h-4 w-4 shrink-0 text-stone-600" />
                                        <span className="font-medium">
                                            Account Settings
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            onNavigate("admin-firm");
                                            handleClose();
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm text-stone-700 transition hover:bg-stone-50"
                                    >
                                        <Building2 className="h-4 w-4 shrink-0 text-stone-600" />
                                        <span className="font-medium">
                                            Business Details
                                        </span>
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="border-t border-stone-200 p-1">
                            <button
                                onClick={onLogout}
                                disabled={isLoggingOut}
                                className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                            >
                                <LogOut className="h-4 w-4 shrink-0 text-red-600" />
                                <span className="font-medium">
                                    {isLoggingOut ? "Logging out..." : "Logout"}
                                </span>
                            </button>
                        </div>
                    </>
                )}

                {panelView === "profile" && <ProfileView user={user} />}

                {panelView === "edit" && (
                    <ProfileEditView
                        ref={editSaveRef}
                        user={user}
                        successMessage={successMessage}
                        onSaveSuccess={() => {
                            setPanelView("profile");
                            setSuccessMessage("Profile updated");
                            setTimeout(() => setSuccessMessage(""), 3000);
                        }}
                    />
                )}
            </div>

            {panelView === "profile" && (
                <div
                    style={{ flexShrink: 0 }}
                    className="border-t border-stone-200 px-4 py-3 bg-stone-50"
                >
                    <button
                        onClick={() => setPanelView("edit")}
                        className="w-full px-4 py-2 text-sm font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                        Edit profile
                    </button>
                </div>
            )}

            {panelView === "edit" && (
                <div
                    style={{ flexShrink: 0 }}
                    className="border-t border-stone-200 px-4 py-3 bg-stone-50 flex gap-2"
                >
                    <button
                        onClick={() => setPanelView("profile")}
                        className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 active:scale-95 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => editSaveRef.current?.save()}
                        className="flex-1 px-4 py-2 text-sm font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                        Save
                    </button>
                </div>
            )}

            {panelView === "menu" && (
                <div
                    style={{ flexShrink: 0 }}
                    className="border-t border-stone-200 px-4 py-3 bg-stone-50"
                >
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-600">
                        Standard plan
                    </p>
                </div>
            )}
        </div>
    );
}

function ProfileView({ user }: { user: User }) {
    return (
        <div className="px-4 py-4 space-y-3">
            <DetailField label="First Name" value={user.firstName || "—"} />
            <DetailField label="Last Name" value={user.lastName || "—"} />
            <DetailField label="Username" value={user.username} />
            <DetailField label="Email" value={user.email} />
            <DetailField label="Role" value={user.role} />
            <div className="border-t border-stone-200 pt-3">
                <p
                    style={{ fontSize: "10px" }}
                    className="font-bold uppercase tracking-wider text-stone-500 mb-1.5"
                >
                    Status
                </p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    {user.status || "ACTIVE"}
                </span>
            </div>
        </div>
    );
}

function DetailField({ label, value }: { label: string; value: string }) {
    return (
        <div className="border-t border-stone-200 pt-3">
            <p
                style={{ fontSize: "10px" }}
                className="font-bold uppercase tracking-wider text-stone-500 mb-1.5"
            >
                {label}
            </p>
            <p
                style={{ fontSize: "13.5px" }}
                className="text-stone-900 font-medium"
            >
                {value}
            </p>
        </div>
    );
}

const ProfileEditView = forwardRef<
    ProfileEditHandle,
    {
        user: User;
        successMessage: string;
        onSaveSuccess: () => void;
    }
>(({ user, successMessage, onSaveSuccess }, ref) => {
    const [firstName, setFirstName] = useState(user.firstName ?? "");
    const [lastName, setLastName] = useState(user.lastName ?? "");
    const [error, setError] = useState("");
    const { mutate: updateProfile, isPending } = useUpdateUserProfile();

    const handleSave = () => {
        setError("");
        updateProfile(
            { firstName, lastName },
            {
                onSuccess: () => {
                    onSaveSuccess();
                },
                onError: (err: unknown) => {
                    const message =
                        err instanceof Error
                            ? err.message
                            : "Failed to update profile. Please try again.";
                    setError(message);
                },
            },
        );
    };

    useImperativeHandle(ref, () => ({ save: handleSave }));

    return (
        <div className="px-4 py-4 space-y-3">
            {successMessage && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 animate-in fade-in duration-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <p
                        style={{ fontSize: "12px" }}
                        className="font-bold text-emerald-900"
                    >
                        {successMessage}
                    </p>
                </div>
            )}

            {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 animate-in fade-in duration-200">
                    <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                    <p
                        style={{ fontSize: "12px" }}
                        className="font-bold text-red-900"
                    >
                        {error}
                    </p>
                </div>
            )}

            <EditableField
                label="First Name"
                value={firstName}
                onChange={setFirstName}
                disabled={isPending}
                placeholder="Enter first name"
            />

            <EditableField
                label="Last Name"
                value={lastName}
                onChange={setLastName}
                disabled={isPending}
                placeholder="Enter last name"
            />
        </div>
    );
});

ProfileEditView.displayName = "ProfileEditView";

function EditableField({
    label,
    value,
    onChange,
    disabled,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    disabled: boolean;
    placeholder: string;
}) {
    return (
        <div>
            <label
                style={{ fontSize: "10px" }}
                className="font-bold uppercase tracking-wider text-stone-500 block mb-1.5"
            >
                {label}
            </label>
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full px-3 py-2.5 rounded-[10px] border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 disabled:opacity-60 disabled:bg-stone-50 transition"
            />
        </div>
    );
}
