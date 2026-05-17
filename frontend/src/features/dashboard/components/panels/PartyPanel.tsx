"use client";

import { useState } from "react";
import { Plus, Users } from "lucide-react";

import type { User } from "@/common/types";
import { useParties } from "@/features/party/hooks";
import type { PartyRecord } from "@/features/party/types";
import { useDashboardStore } from "../../store";

import { PartyCatalogTable } from "./party/PartyCatalogTable";
import { PartyForm } from "./party/PartyForm";
import { DeletePartyDialog } from "./party/PartyDialogs";

type Mode = "all" | "party-entry" | "party-catalog";

function getMode(activeNavId: string): Mode {
    if (activeNavId === "party-entry" || activeNavId === "party-catalog") {
        return activeNavId;
    }

    return "all";
}

export function PartyPanel({}: { currentUser: User }) {
    const activeNavId = useDashboardStore((state) => state.activeNavId);
    const mode = getMode(activeNavId);
    const canManage = true;

    const partiesQuery = useParties();
    const parties = partiesQuery.data ?? [];

    const [editingParty, setEditingParty] = useState<PartyRecord | null>(null);
    const [deletingParty, setDeletingParty] = useState<PartyRecord | null>(
        null,
    );

    const showEntry = canManage && (mode === "all" || mode === "party-entry");
    const showCatalog =
        mode === "all" ||
        mode === "party-catalog" ||
        (!canManage && mode === "party-entry");

    return (
        <div className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-amber-700" />
                        <h2 className="text-lg font-semibold text-stone-900">
                            Party management
                        </h2>
                    </div>
                    <p className="mt-1 text-sm text-stone-500">
                        Manage farmers, dealers, brokers, and other parties from
                        a single catalog.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                {showEntry ? (
                    <section className="rounded-xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] lg:col-span-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Plus className="h-4 w-4 text-amber-700" />
                            <h3 className="text-sm font-semibold text-stone-900">
                                Create party
                            </h3>
                        </div>
                        <PartyForm mode="create" onDone={() => undefined} />
                    </section>
                ) : null}

                {showCatalog ? (
                    <section className="rounded-xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] lg:col-span-12">
                        <PartyCatalogTable
                            canManage={canManage}
                            onDelete={setDeletingParty}
                            onEdit={setEditingParty}
                            records={parties}
                        />
                    </section>
                ) : null}
            </div>

            {editingParty ? (
                <PartyEditOverlay
                    record={editingParty}
                    onClose={() => setEditingParty(null)}
                />
            ) : null}

            {deletingParty ? (
                <DeletePartyDialog
                    onClose={() => setDeletingParty(null)}
                    record={deletingParty}
                />
            ) : null}
        </div>
    );
}

function PartyEditOverlay({
    record,
    onClose,
}: {
    record: PartyRecord;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4">
            <div className="w-full max-w-2xl rounded-xl border border-stone-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                <PartyForm
                    initialValue={record}
                    mode="edit"
                    onCancel={onClose}
                    onDone={onClose}
                />
            </div>
        </div>
    );
}
