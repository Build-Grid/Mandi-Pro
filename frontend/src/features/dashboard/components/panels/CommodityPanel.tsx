"use client";

import { useState } from "react";
import { Package, Plus, Shapes } from "lucide-react";

import type { User } from "@/common/types";
import { canManageCommodityCatalog } from "@/features/commodity/constants";
import {
    useCommodities,
    useCommodityTypes,
    useUnitsGrouped,
} from "@/features/commodity/hooks";
import type {
    CommodityRecord,
    CommodityTypeRecord,
} from "@/features/commodity/types";
import { useDashboardStore } from "../../store";

import {
    CommodityCatalogTable,
    CommodityTypeCatalogTable,
} from "./commodity/CommodityCatalogs";
import { CommodityForm, CommodityTypeForm } from "./commodity/CommodityForms";
import {
    DeleteCommodityDialog,
    DeleteTypeDialog,
} from "./commodity/CommodityDialogs";

type Mode =
    | "all"
    | "commodity-type-entry"
    | "commodity-entry"
    | "commodity-type-catalog"
    | "commodity-catalog";

function getMode(activeNavId: string): Mode {
    switch (activeNavId) {
        case "commodity-type-entry":
        case "commodity-entry":
        case "commodity-type-catalog":
        case "commodity-catalog":
            return activeNavId;
        default:
            return "all";
    }
}

export function CommodityPanel({ currentUser }: { currentUser: User }) {
    const activeNavId = useDashboardStore((state) => state.activeNavId);
    const mode = getMode(activeNavId);
    const canManage = canManageCommodityCatalog(currentUser.role);

    const commodityTypesQuery = useCommodityTypes();
    const commoditiesQuery = useCommodities();
    const unitsByTypeQuery = useUnitsGrouped();

    const commodityTypes = commodityTypesQuery.data ?? [];
    const commodities = commoditiesQuery.data ?? [];
    const unitsByType = unitsByTypeQuery.data ?? {};

    const [editingType, setEditingType] = useState<CommodityTypeRecord | null>(
        null,
    );
    const [editingCommodity, setEditingCommodity] =
        useState<CommodityRecord | null>(null);
    const [confirmDeleteType, setConfirmDeleteType] =
        useState<CommodityTypeRecord | null>(null);
    const [confirmDeleteCommodity, setConfirmDeleteCommodity] =
        useState<CommodityRecord | null>(null);

    const showTypeEntry =
        canManage && (mode === "all" || mode === "commodity-type-entry");
    const showCommodityEntry =
        canManage && (mode === "all" || mode === "commodity-entry");
    const showTypeCatalog =
        mode === "all" ||
        mode === "commodity-type-catalog" ||
        (!canManage && mode === "commodity-type-entry");
    const showCommodityCatalog =
        mode === "all" ||
        mode === "commodity-catalog" ||
        (!canManage && mode === "commodity-entry");

    return (
        <div className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-emerald-700" />
                        <h2 className="text-lg font-semibold text-stone-900">
                            Commodity management
                        </h2>
                    </div>
                    <p className="mt-1 text-sm text-stone-500">
                        Manage commodity types and commodity catalog with
                        validated form flows.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                {showTypeEntry ? (
                    <section className="rounded-xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] lg:col-span-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Shapes className="h-4 w-4 text-emerald-700" />
                            <h3 className="text-sm font-semibold text-stone-900">
                                Create commodity type
                            </h3>
                        </div>
                        <CommodityTypeForm
                            mode="create"
                            onDone={() => undefined}
                        />
                    </section>
                ) : null}

                {showCommodityEntry ? (
                    <section className="rounded-xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] lg:col-span-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Plus className="h-4 w-4 text-amber-700" />
                            <h3 className="text-sm font-semibold text-stone-900">
                                Create commodity
                            </h3>
                        </div>
                        <CommodityForm
                            commodityTypes={commodityTypes}
                            mode="create"
                            onDone={() => undefined}
                            unitsByType={unitsByType}
                        />
                    </section>
                ) : null}

                {showTypeCatalog ? (
                    <section className="rounded-xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] lg:col-span-12">
                        <CommodityTypeCatalogTable
                            canManage={canManage}
                            onDelete={setConfirmDeleteType}
                            onEdit={setEditingType}
                            records={commodityTypes}
                        />
                    </section>
                ) : null}

                {showCommodityCatalog ? (
                    <section className="rounded-xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] lg:col-span-12">
                        <CommodityCatalogTable
                            canManage={canManage}
                            commodityTypes={commodityTypes}
                            onDelete={setConfirmDeleteCommodity}
                            onEdit={setEditingCommodity}
                            records={commodities}
                            unitsByType={unitsByType}
                        />
                    </section>
                ) : null}
            </div>

            {editingType ? (
                <ModalEditCommodityType
                    record={editingType}
                    onClose={() => setEditingType(null)}
                />
            ) : null}

            {editingCommodity ? (
                <ModalEditCommodity
                    record={editingCommodity}
                    commodityTypes={commodityTypes}
                    onClose={() => setEditingCommodity(null)}
                    unitsByType={unitsByType}
                />
            ) : null}

            {confirmDeleteType ? (
                <DeleteTypeDialog
                    onClose={() => setConfirmDeleteType(null)}
                    record={confirmDeleteType}
                />
            ) : null}
            {confirmDeleteCommodity ? (
                <DeleteCommodityDialog
                    onClose={() => setConfirmDeleteCommodity(null)}
                    record={confirmDeleteCommodity}
                />
            ) : null}
        </div>
    );
}

function ModalEditCommodityType({
    record,
    onClose,
}: {
    record: CommodityTypeRecord;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4">
            <div className="w-full max-w-2xl rounded-xl border border-stone-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                <CommodityTypeForm
                    initialValue={record}
                    mode="edit"
                    onCancel={onClose}
                    onDone={onClose}
                />
            </div>
        </div>
    );
}

function ModalEditCommodity({
    record,
    commodityTypes,
    unitsByType,
    onClose,
}: {
    record: CommodityRecord;
    commodityTypes: CommodityTypeRecord[];
    unitsByType: Record<
        string,
        import("@/features/commodity/types").UnitRecord[]
    >;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4">
            <div className="w-full max-w-2xl rounded-xl border border-stone-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                <CommodityForm
                    initialValue={record}
                    commodityTypes={commodityTypes}
                    mode="edit"
                    onCancel={onClose}
                    onDone={onClose}
                    unitsByType={unitsByType}
                />
            </div>
        </div>
    );
}
