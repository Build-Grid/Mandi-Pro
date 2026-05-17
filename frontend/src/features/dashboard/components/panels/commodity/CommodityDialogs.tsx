"use client";

import type { ReactNode } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

import {
    useDeleteCommodity,
    useDeleteCommodityType,
} from "@/features/commodity/hooks";
import type {
    CommodityRecord,
    CommodityTypeRecord,
} from "@/features/commodity/types";

export function DeleteTypeDialog({
    record,
    onClose,
}: {
    record: CommodityTypeRecord;
    onClose: () => void;
}) {
    const { mutate: deleteMut, isPending } = useDeleteCommodityType();

    return (
        <ConfirmDialog
            title="Delete commodity type"
            description={`Delete "${record.typeName}"? This action cannot be undone.`}
            pending={isPending}
            onConfirm={() => {
                deleteMut(record.id, {
                    onSuccess: () => onClose(),
                });
            }}
            onClose={onClose}
        />
    );
}

export function DeleteCommodityDialog({
    record,
    onClose,
}: {
    record: CommodityRecord;
    onClose: () => void;
}) {
    const { mutate: deleteMut, isPending } = useDeleteCommodity();

    return (
        <ConfirmDialog
            title="Delete commodity"
            description={`Delete "${record.name}"? This action cannot be undone.`}
            pending={isPending}
            onConfirm={() => {
                deleteMut(record.id, {
                    onSuccess: () => onClose(),
                });
            }}
            onClose={onClose}
        />
    );
}

function ConfirmDialog({
    title,
    description,
    pending,
    onConfirm,
    onClose,
}: {
    title: string;
    description: string;
    pending: boolean;
    onConfirm: () => void;
    onClose: () => void;
}) {
    return (
        <ModalFrame title={title} onClose={onClose}>
            <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-800">{description}</p>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={pending}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                    >
                        <Trash2 className="h-4 w-4" />
                        {pending ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </ModalFrame>
    );
}

function ModalFrame({
    title,
    children,
    onClose,
}: {
    title: string;
    children: ReactNode;
    onClose: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl rounded-xl border border-stone-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-stone-900">
                        {title}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-stone-200 p-1 text-stone-600 hover:bg-stone-50"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
