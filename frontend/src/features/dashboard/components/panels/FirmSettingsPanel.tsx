"use client";

import { useState } from "react";
import type { Firm, User } from "@/common/types";
import { useDeleteFirm, useUpdateFirm } from "@/features/auth/hooks";
import { AlertCircle, Building2, Edit3 } from "lucide-react";

export function FirmSettingsPanel({
    currentUser,
    firm,
}: {
    currentUser: User;
    firm: Firm;
}) {
    const { mutate: updateFirmMut, isPending: updatingFirm } = useUpdateFirm();
    const { mutate: deleteFirmMut, isPending: deletingFirm } = useDeleteFirm();
    const canUpdateFirm = currentUser.role === "OWNER";

    return (
        <div className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-amber-700" />
                        <h2 className="text-lg font-semibold text-stone-900">
                            Firm settings
                        </h2>
                    </div>
                    <p className="mt-1 text-sm text-stone-500">
                        Manage your organization&apos;s profile and
                        configurations.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-12">
                <section className="lg:col-span-6 rounded-xl border border-stone-200/60 bg-linear-to-br from-stone-50 to-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                    <h3 className="text-sm font-semibold text-stone-900 mb-4">
                        Firm profile
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                                Organization name
                            </span>
                            <span className="text-sm font-semibold text-stone-900">
                                {firm.name}
                            </span>
                        </div>
                        <div className="h-px bg-stone-200" />
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                                Plan type
                            </span>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                                {firm.planType}
                            </span>
                        </div>
                        <div className="h-px bg-stone-200" />
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                                Owner
                            </span>
                            <span className="text-sm font-semibold text-stone-900">
                                {firm.ownerName}
                            </span>
                        </div>
                        <div className="h-px bg-stone-200" />
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                                Email
                            </span>
                            <span className="text-sm font-semibold text-stone-900 truncate ml-2">
                                {firm.ownerEmail}
                            </span>
                        </div>
                    </div>
                </section>

                <section className="lg:col-span-6 rounded-xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow">
                    <div className="flex items-center gap-2 mb-4">
                        <Edit3 className="h-4 w-4 text-amber-600" />
                        <h3 className="text-sm font-semibold text-stone-900">
                            Update profile
                        </h3>
                    </div>
                    <p className="text-xs text-stone-500 mb-4">
                        Change your organization name.
                    </p>
                    {canUpdateFirm ? (
                        <FirmSettingsForm
                            firm={firm}
                            onSave={(name) => updateFirmMut({ firmName: name })}
                            saving={updatingFirm}
                        />
                    ) : (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                            <p className="text-xs font-semibold text-amber-900">
                                Only the owner can update the firm profile.
                            </p>
                        </div>
                    )}
                </section>

                <section className="lg:col-span-12 rounded-xl border border-red-300/40 bg-linear-to-r from-red-50 to-red-50/50 p-6 shadow-[0_1px_3px_rgba(220,38,38,0.04)]">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <h3 className="text-sm font-semibold text-red-900">
                                    Danger zone
                                </h3>
                            </div>
                            <p className="text-xs text-red-700">
                                Deleting your firm is permanent. All data will
                                be lost.
                            </p>
                        </div>
                        {currentUser.role === "OWNER" ? (
                            <button
                                onClick={() => deleteFirmMut()}
                                disabled={deletingFirm}
                                className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60 whitespace-nowrap"
                            >
                                {deletingFirm ? "Deleting..." : "Delete firm"}
                            </button>
                        ) : (
                            <span className="text-xs text-red-700 bg-red-100 rounded-lg px-3 py-2">
                                Owner only
                            </span>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

function FirmSettingsForm({
    firm,
    onSave,
    saving,
}: {
    firm: Firm;
    onSave: (name: string) => void;
    saving?: boolean;
}) {
    const [name, setName] = useState(firm.name);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSave(name.trim());
            }}
            className="space-y-3"
        >
            <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                    Firm name
                </label>
                <input
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition disabled:opacity-60 mt-4"
                disabled={saving || name.trim().length === 0}
            >
                {saving ? "Saving..." : "Update firm"}
            </button>
        </form>
    );
}
