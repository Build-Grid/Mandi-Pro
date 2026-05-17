"use client";

import { useMemo, useState } from "react";
import { Edit3, Package, Search, Tag, Trash2 } from "lucide-react";

import type {
    CommodityRecord,
    CommodityTypeRecord,
    UnitRecord,
} from "@/features/commodity/types";

function classNames(...values: Array<string | false | null | undefined>) {
    return values.filter(Boolean).join(" ");
}

export function CommodityTypeCatalogTable({
    records,
    canManage,
    onEdit,
    onDelete,
}: {
    records: CommodityTypeRecord[];
    canManage: boolean;
    onEdit: (record: CommodityTypeRecord) => void;
    onDelete: (record: CommodityTypeRecord) => void;
}) {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return records;
        return records.filter(
            (entry) =>
                entry.typeName.toLowerCase().includes(query) ||
                (entry.description ?? "").toLowerCase().includes(query),
        );
    }, [records, search]);

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-emerald-700" />
                        <h3 className="text-sm font-semibold text-stone-900">
                            Commodity type catalog
                        </h3>
                    </div>
                    <p className="mt-1 text-xs text-stone-500">
                        Search and review commodity types in a compact table.
                    </p>
                </div>
                <div className="w-full sm:w-72">
                    <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
                        <Search className="h-4 w-4 text-stone-500" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search type"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-stone-200">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
                        <tr>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Description</th>
                            {canManage ? (
                                <th className="px-4 py-3 text-right">
                                    Actions
                                </th>
                            ) : null}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {filtered.length > 0 ? (
                            filtered.map((entry) => (
                                <tr key={entry.id} className="bg-white">
                                    <td className="px-4 py-3 font-medium text-stone-900">
                                        {entry.typeName}
                                    </td>
                                    <td className="px-4 py-3 text-stone-600">
                                        {entry.description || "-"}
                                    </td>
                                    {canManage ? (
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onEdit(entry)
                                                    }
                                                    className="inline-flex items-center gap-1 rounded-md border border-stone-200 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:border-emerald-300 hover:text-emerald-700"
                                                >
                                                    <Edit3 className="h-3.5 w-3.5" />
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onDelete(entry)
                                                    }
                                                    className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    ) : null}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={canManage ? 3 : 2}
                                    className="px-4 py-8 text-center text-sm text-stone-500"
                                >
                                    No commodity types found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function CommodityCatalogTable({
    records,
    commodityTypes,
    unitsByType,
    canManage,
    onEdit,
    onDelete,
}: {
    records: CommodityRecord[];
    commodityTypes: CommodityTypeRecord[];
    unitsByType: Record<string, UnitRecord[]>;
    canManage: boolean;
    onEdit: (record: CommodityRecord) => void;
    onDelete: (record: CommodityRecord) => void;
}) {
    const [search, setSearch] = useState("");

    const typeLookupById = useMemo(
        () =>
            new Map(commodityTypes.map((entry) => [entry.id, entry.typeName])),
        [commodityTypes],
    );
    const unitLookupById = useMemo(() => {
        const map = new Map<number, UnitRecord>();
        for (const units of Object.values(unitsByType)) {
            for (const unit of units) {
                map.set(unit.id, unit);
            }
        }
        return map;
    }, [unitsByType]);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return records;
        return records.filter((entry) => {
            const typeName =
                entry.commodityTypeName ||
                (entry.commodityTypeId
                    ? (typeLookupById.get(entry.commodityTypeId) ?? "")
                    : "");
            const unitLabel =
                entry.unitCode ||
                (entry.unitId
                    ? (unitLookupById.get(entry.unitId)?.unitCode ?? "")
                    : "") ||
                "";
            return (
                entry.name.toLowerCase().includes(query) ||
                (entry.localName ?? "").toLowerCase().includes(query) ||
                (entry.description ?? "").toLowerCase().includes(query) ||
                typeName.toLowerCase().includes(query) ||
                unitLabel.toLowerCase().includes(query)
            );
        });
    }, [records, search, typeLookupById, unitLookupById]);

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-amber-700" />
                        <h3 className="text-sm font-semibold text-stone-900">
                            Commodity catalog
                        </h3>
                    </div>
                    <p className="mt-1 text-xs text-stone-500">
                        Search commodities by name, type, and unit.
                    </p>
                </div>
                <div className="w-full sm:w-72">
                    <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
                        <Search className="h-4 w-4 text-stone-500" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search commodity"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-stone-200">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
                        <tr>
                            <th className="px-4 py-3">Commodity</th>
                            <th className="px-4 py-3">Local name</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Unit</th>
                            <th className="px-4 py-3">Description</th>
                            {canManage ? (
                                <th className="px-4 py-3 text-right">
                                    Actions
                                </th>
                            ) : null}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {filtered.length > 0 ? (
                            filtered.map((entry) => {
                                const typeName =
                                    entry.commodityTypeName ||
                                    (entry.commodityTypeId
                                        ? (typeLookupById.get(
                                              entry.commodityTypeId,
                                          ) ?? "-")
                                        : "-");
                                const unitLabel =
                                    entry.unitCode ||
                                    (entry.unitId
                                        ? (unitLookupById.get(entry.unitId)
                                              ?.unitCode ?? "-")
                                        : "-");
                                return (
                                    <tr key={entry.id} className="bg-white">
                                        <td className="px-4 py-3 font-medium text-stone-900">
                                            {entry.name}
                                        </td>
                                        <td className="px-4 py-3 text-stone-600">
                                            {entry.localName || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-stone-600">
                                            {typeName}
                                        </td>
                                        <td className="px-4 py-3 text-stone-600">
                                            {unitLabel}
                                        </td>
                                        <td className="px-4 py-3 text-stone-600">
                                            {entry.description || "-"}
                                        </td>
                                        {canManage ? (
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onEdit(entry)
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-md border border-stone-200 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:border-amber-300 hover:text-amber-700"
                                                    >
                                                        <Edit3 className="h-3.5 w-3.5" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onDelete(entry)
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        ) : null}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={canManage ? 6 : 5}
                                    className="px-4 py-8 text-center text-sm text-stone-500"
                                >
                                    No commodities found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
