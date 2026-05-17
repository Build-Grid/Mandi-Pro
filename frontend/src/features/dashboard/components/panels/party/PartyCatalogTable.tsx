"use client";

import { useMemo, useState } from "react";
import { Edit3, Search, Trash2 } from "lucide-react";

import type { PartyRecord } from "@/features/party/types";

export function PartyCatalogTable({
    records,
    canManage,
    onEdit,
    onDelete,
}: {
    records: PartyRecord[];
    canManage: boolean;
    onEdit: (record: PartyRecord) => void;
    onDelete: (record: PartyRecord) => void;
}) {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return records;
        return records.filter((entry) => {
            return (
                entry.name.toLowerCase().includes(query) ||
                entry.type.toLowerCase().includes(query) ||
                entry.contactNumber.toLowerCase().includes(query) ||
                (entry.address ?? "").toLowerCase().includes(query) ||
                (entry.village ?? "").toLowerCase().includes(query) ||
                (entry.description ?? "").toLowerCase().includes(query)
            );
        });
    }, [records, search]);

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-sm font-semibold text-stone-900">
                        Party catalog
                    </h3>
                    <p className="mt-1 text-xs text-stone-500">
                        Search and review all party records.
                    </p>
                </div>
                <div className="w-full sm:w-72">
                    <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
                        <Search className="h-4 w-4 text-stone-500" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search party"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-stone-200">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Contact number</th>
                            <th className="px-4 py-3">Address</th>
                            <th className="px-4 py-3">Village</th>
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
                                        {entry.name}
                                    </td>
                                    <td className="px-4 py-3 text-stone-600">
                                        {entry.type}
                                    </td>
                                    <td className="px-4 py-3 text-stone-600">
                                        {entry.contactNumber}
                                    </td>
                                    <td className="px-4 py-3 text-stone-600">
                                        {entry.address || "-"}
                                    </td>
                                    <td className="px-4 py-3 text-stone-600">
                                        {entry.village || "-"}
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
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={canManage ? 7 : 6}
                                    className="px-4 py-8 text-center text-sm text-stone-500"
                                >
                                    No parties found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
