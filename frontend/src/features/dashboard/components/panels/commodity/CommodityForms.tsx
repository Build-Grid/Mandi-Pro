"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, ChevronDown, Plus, Search } from "lucide-react";

import { canManageCommodityCatalog } from "@/features/commodity/constants";
import {
    useCreateCommodity,
    useCreateCommodityType,
    useUpdateCommodity,
    useUpdateCommodityType,
} from "@/features/commodity/hooks";
import type {
    CommodityFormValues,
    CommodityRecord,
    CommodityTypeFormValues,
    CommodityTypeRecord,
    UnitRecord,
} from "@/features/commodity/types";
import { AppError } from "@/lib/errors";

import {
    classNames,
    extractValidationState,
    formatConversionFactor,
    formatUnitType,
} from "./utils";

function Field({
    label,
    children,
    error,
}: {
    label: string;
    children: React.ReactNode;
    error?: string;
}) {
    return (
        <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                {label}
            </label>
            {children}
            {error ? (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            ) : null}
        </div>
    );
}

export function CommodityTypeForm({
    mode,
    initialValue,
    onDone,
    onCancel,
}: {
    mode: "create" | "edit";
    initialValue?: CommodityTypeRecord;
    onDone: () => void;
    onCancel?: () => void;
}) {
    const { mutate: createTypeMut, isPending: creating } =
        useCreateCommodityType();
    const { mutate: updateTypeMut, isPending: updating } =
        useUpdateCommodityType();

    const [typeName, setTypeName] = useState(initialValue?.typeName ?? "");
    const [description, setDescription] = useState(
        initialValue?.description ?? "",
    );
    const [formError, setFormError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const submitting = creating || updating;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedName = typeName.trim();
        const payload: CommodityTypeFormValues = {
            typeName: trimmedName,
            description: description.trim(),
        };

        const localFieldErrors: Record<string, string> = {};
        if (!trimmedName) {
            localFieldErrors.typeName = "Type name is required";
        }

        if (Object.keys(localFieldErrors).length > 0) {
            setFieldErrors(localFieldErrors);
            setFormError("Validation failed");
            return;
        }

        setFieldErrors({});
        setFormError(null);

        const onError = (error: unknown) => {
            const nextState = extractValidationState(error);
            setFieldErrors(nextState.fieldErrors);
            setFormError(nextState.formError);
        };

        if (mode === "edit" && initialValue) {
            updateTypeMut(
                { id: initialValue.id, ...payload },
                { onSuccess: () => onDone(), onError },
            );
            return;
        }

        createTypeMut(payload, {
            onSuccess: () => {
                setTypeName("");
                setDescription("");
                setFormError(null);
                setFieldErrors({});
                onDone();
            },
            onError,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <Field label="Type name" error={fieldErrors.typeName}>
                <input
                    value={typeName}
                    onChange={(event) => setTypeName(event.target.value)}
                    placeholder="Wheat"
                    className={classNames(
                        "w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none",
                        fieldErrors.typeName
                            ? "border-red-300 focus:border-red-500"
                            : "border-stone-300 focus:border-emerald-500",
                    )}
                    required
                />
            </Field>

            <Field label="Description" error={fieldErrors.description}>
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Sharbati, Durum (Macaroni), Lokwan"
                    className={classNames(
                        "min-h-24 w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none",
                        fieldErrors.description
                            ? "border-red-300 focus:border-red-500"
                            : "border-stone-300 focus:border-emerald-500",
                    )}
                />
            </Field>

            {formError ? (
                <p className="text-xs font-medium text-red-600">{formError}</p>
            ) : null}

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                    <Plus className="h-4 w-4" />
                    {mode === "edit"
                        ? updating
                            ? "Updating..."
                            : "Update type"
                        : creating
                          ? "Saving..."
                          : "Save type"}
                </button>
                {onCancel ? (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50"
                    >
                        Cancel
                    </button>
                ) : null}
            </div>
        </form>
    );
}

export function CommodityForm({
    mode,
    initialValue,
    commodityTypes,
    unitsByType,
    onDone,
    onCancel,
}: {
    mode: "create" | "edit";
    initialValue?: CommodityRecord;
    commodityTypes: CommodityTypeRecord[];
    unitsByType: Record<string, UnitRecord[]>;
    onDone: () => void;
    onCancel?: () => void;
}) {
    const { mutate: createCommodityMut, isPending: creating } =
        useCreateCommodity();
    const { mutate: updateCommodityMut, isPending: updating } =
        useUpdateCommodity();

    const initialCommodityTypeId = useMemo(() => {
        if (!initialValue) {
            return "";
        }

        if (initialValue.commodityTypeId) {
            return String(initialValue.commodityTypeId);
        }

        if (!initialValue.commodityTypeName) {
            return "";
        }

        const match = commodityTypes.find(
            (entry) =>
                entry.typeName.toLowerCase() ===
                initialValue.commodityTypeName?.toLowerCase(),
        );

        return match ? String(match.id) : "";
    }, [commodityTypes, initialValue]);

    const unitLookupByCode = useMemo(() => {
        const map = new Map<string, UnitRecord>();
        for (const units of Object.values(unitsByType)) {
            for (const unit of units) {
                map.set(unit.unitCode.toLowerCase(), unit);
            }
        }
        return map;
    }, [unitsByType]);

    const initialUnitId = useMemo(() => {
        if (!initialValue) {
            return "";
        }

        if (initialValue.unitId) {
            return String(initialValue.unitId);
        }

        if (!initialValue.unitCode) {
            return "";
        }

        const match = unitLookupByCode.get(initialValue.unitCode.toLowerCase());
        return match ? String(match.id) : "";
    }, [initialValue, unitLookupByCode]);

    const [name, setName] = useState(initialValue?.name ?? "");
    const [localName, setLocalName] = useState(initialValue?.localName ?? "");
    const [description, setDescription] = useState(
        initialValue?.description ?? "",
    );
    const [commodityTypeId, setCommodityTypeId] = useState(
        initialCommodityTypeId,
    );
    const [unitId, setUnitId] = useState(initialUnitId);
    const [formError, setFormError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const submitting = creating || updating;
    const selectedType =
        commodityTypes.find((entry) => String(entry.id) === commodityTypeId) ??
        null;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const localFieldErrors: Record<string, string> = {};
        const trimmedName = name.trim();

        if (!trimmedName) {
            localFieldErrors.name = "Commodity name is required";
        }
        if (!commodityTypeId) {
            localFieldErrors.commodityTypeId = "Commodity type is required";
        }
        if (!unitId) {
            localFieldErrors.unitId = "Unit selection is required";
        }

        if (Object.keys(localFieldErrors).length > 0) {
            setFieldErrors(localFieldErrors);
            setFormError("Validation failed");
            return;
        }

        setFieldErrors({});
        setFormError(null);

        const payload: CommodityFormValues = {
            name: trimmedName,
            localName: localName.trim(),
            description: description.trim(),
            commodityTypeId: Number(commodityTypeId),
            unitId: Number(unitId),
        };

        const onError = (error: unknown) => {
            const nextState = extractValidationState(error);
            setFieldErrors(nextState.fieldErrors);
            setFormError(nextState.formError);
        };

        if (mode === "edit" && initialValue) {
            updateCommodityMut(
                { id: initialValue.id, ...payload },
                { onSuccess: () => onDone(), onError },
            );
            return;
        }

        createCommodityMut(payload, {
            onSuccess: () => {
                setName("");
                setLocalName("");
                setDescription("");
                setCommodityTypeId("");
                setUnitId("");
                setFormError(null);
                setFieldErrors({});
                onDone();
            },
            onError,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Commodity name" error={fieldErrors.name}>
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Wheat Premium"
                        className={classNames(
                            "w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none",
                            fieldErrors.name
                                ? "border-red-300 focus:border-red-500"
                                : "border-stone-300 focus:border-amber-500",
                        )}
                        required
                    />
                </Field>

                <Field label="Local name" error={fieldErrors.localName}>
                    <input
                        value={localName}
                        onChange={(event) => setLocalName(event.target.value)}
                        placeholder="Lokwan"
                        className={classNames(
                            "w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none",
                            fieldErrors.localName
                                ? "border-red-300 focus:border-red-500"
                                : "border-stone-300 focus:border-amber-500",
                        )}
                    />
                </Field>
            </div>

            <TypePicker
                commodityTypeId={commodityTypeId}
                onChange={setCommodityTypeId}
                options={commodityTypes}
                error={fieldErrors.commodityTypeId}
            />
            <UnitPicker
                unitId={unitId}
                onChange={setUnitId}
                unitsByType={unitsByType}
                error={fieldErrors.unitId}
            />

            <Field label="Description" error={fieldErrors.description}>
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Clean, graded stock with mandi-ready packaging"
                    className={classNames(
                        "min-h-24 w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none",
                        fieldErrors.description
                            ? "border-red-300 focus:border-red-500"
                            : "border-stone-300 focus:border-amber-500",
                    )}
                />
            </Field>

            {selectedType ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                    Selected type: {selectedType.typeName}
                </div>
            ) : null}

            {formError ? (
                <p className="text-xs font-medium text-red-600">{formError}</p>
            ) : null}

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
                >
                    <Plus className="h-4 w-4" />
                    {mode === "edit"
                        ? updating
                            ? "Updating..."
                            : "Update commodity"
                        : creating
                          ? "Saving..."
                          : "Save commodity"}
                </button>
                {onCancel ? (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50"
                    >
                        Cancel
                    </button>
                ) : null}
            </div>
        </form>
    );
}

function TypePicker({
    commodityTypeId,
    onChange,
    options,
    error,
}: {
    commodityTypeId: string;
    onChange: (value: string) => void;
    options: CommodityTypeRecord[];
    error?: string;
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const selected =
        options.find((entry) => String(entry.id) === commodityTypeId) ?? null;
    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return options;
        return options.filter(
            (entry) =>
                entry.typeName.toLowerCase().includes(query) ||
                (entry.description ?? "").toLowerCase().includes(query),
        );
    }, [options, search]);

    return (
        <div className="relative">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Commodity type
            </label>
            <button
                type="button"
                onClick={() => setOpen((state) => !state)}
                className={classNames(
                    "flex w-full items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2 text-left text-sm text-stone-900",
                    error ? "border-red-300" : "border-stone-300",
                )}
            >
                <span className="min-w-0 truncate">
                    {selected ? selected.typeName : "Choose commodity type"}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-stone-500" />
            </button>
            {error ? (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            ) : null}
            {open ? (
                <div className="absolute z-10 mt-2 w-full rounded-lg border border-stone-200 bg-white p-3 shadow-[0_20px_40px_rgba(41,37,36,0.16)]">
                    <div className="mb-2 flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
                        <Search className="h-4 w-4 text-stone-500" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search commodity type"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                    <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                        {filtered.length > 0 ? (
                            filtered.map((entry) => {
                                const isSelected =
                                    commodityTypeId === String(entry.id);
                                return (
                                    <button
                                        key={entry.id}
                                        type="button"
                                        onClick={() => {
                                            onChange(String(entry.id));
                                            setOpen(false);
                                            setSearch("");
                                        }}
                                        className={classNames(
                                            "flex w-full items-start justify-between rounded-lg border px-3 py-2 text-left transition",
                                            isSelected
                                                ? "border-emerald-300 bg-emerald-50"
                                                : "border-stone-200 bg-white hover:bg-stone-50",
                                        )}
                                    >
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-stone-900">
                                                {entry.typeName}
                                            </p>
                                            <p className="mt-0.5 line-clamp-1 text-[11px] text-stone-500">
                                                {entry.description ||
                                                    "No description"}
                                            </p>
                                        </div>
                                        {isSelected ? (
                                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                                                Selected
                                            </span>
                                        ) : null}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50 px-3 py-5 text-center text-xs text-stone-500">
                                No commodity types found.
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function UnitPicker({
    unitId,
    onChange,
    unitsByType,
    error,
}: {
    unitId: string;
    onChange: (value: string) => void;
    unitsByType: Record<string, UnitRecord[]>;
    error?: string;
}) {
    const [open, setOpen] = useState(false);
    const [typeSearch, setTypeSearch] = useState("");
    const [unitSearch, setUnitSearch] = useState("");
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const typeEntries = useMemo(() => {
        const query = typeSearch.trim().toLowerCase();
        return Object.entries(unitsByType)
            .sort(([a], [b]) => a.localeCompare(b))
            .filter(
                ([type]) =>
                    !query ||
                    formatUnitType(type).toLowerCase().includes(query),
            );
    }, [typeSearch, unitsByType]);

    const selectedUnits = useMemo(() => {
        if (!selectedType) return [] as UnitRecord[];
        const units = unitsByType[selectedType] ?? [];
        const query = unitSearch.trim().toLowerCase();
        if (!query) return units;
        return units.filter(
            (unit) =>
                unit.unitName.toLowerCase().includes(query) ||
                unit.unitCode.toLowerCase().includes(query) ||
                (unit.baseUnitCode ?? "").toLowerCase().includes(query),
        );
    }, [selectedType, unitSearch, unitsByType]);

    const selected = useMemo(() => {
        for (const units of Object.values(unitsByType)) {
            const match = units.find((entry) => String(entry.id) === unitId);
            if (match) return match;
        }
        return null;
    }, [unitId, unitsByType]);

    return (
        <div className="relative">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Unit
            </label>
            <button
                type="button"
                onClick={() => setOpen((state) => !state)}
                className={classNames(
                    "flex w-full items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2 text-left text-sm text-stone-900",
                    error ? "border-red-300" : "border-stone-300",
                )}
            >
                <span className="min-w-0 truncate">
                    {selected
                        ? `${selected.unitName} (${selected.unitCode})`
                        : "Choose unit type"}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-stone-500" />
            </button>
            {error ? (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            ) : null}
            {open ? (
                <div className="absolute z-10 mt-2 w-full rounded-lg border border-stone-200 bg-white p-3 shadow-[0_20px_40px_rgba(41,37,36,0.16)]">
                    {!selectedType ? (
                        <>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                                Unit types
                            </p>
                            <div className="mb-2 flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
                                <Search className="h-4 w-4 text-stone-500" />
                                <input
                                    value={typeSearch}
                                    onChange={(event) =>
                                        setTypeSearch(event.target.value)
                                    }
                                    placeholder="Search unit type"
                                    className="w-full bg-transparent text-sm outline-none"
                                />
                            </div>
                            <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                                {typeEntries.length > 0 ? (
                                    typeEntries.map(([type, units]) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => {
                                                setSelectedType(type);
                                                setUnitSearch("");
                                            }}
                                            className="flex w-full items-center justify-between rounded-lg border border-stone-200 px-3 py-2 text-left hover:bg-stone-50"
                                        >
                                            <span className="text-sm font-medium text-stone-900">
                                                {formatUnitType(type)}
                                            </span>
                                            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-700">
                                                {units.length}
                                            </span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50 px-3 py-5 text-center text-xs text-stone-500">
                                        No unit types found.
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-2 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedType(null);
                                        setUnitSearch("");
                                    }}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    Unit types
                                </button>
                                <span className="text-xs font-semibold text-stone-500">
                                    {formatUnitType(selectedType)}
                                </span>
                            </div>
                            <div className="mb-2 flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
                                <Search className="h-4 w-4 text-stone-500" />
                                <input
                                    value={unitSearch}
                                    onChange={(event) =>
                                        setUnitSearch(event.target.value)
                                    }
                                    placeholder="Search unit in this category"
                                    className="w-full bg-transparent text-sm outline-none"
                                />
                            </div>
                            <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                                {selectedUnits.length > 0 ? (
                                    selectedUnits.map((unit) => {
                                        const isSelected =
                                            unitId === String(unit.id);
                                        return (
                                            <button
                                                key={unit.id}
                                                type="button"
                                                onClick={() => {
                                                    onChange(String(unit.id));
                                                    setOpen(false);
                                                }}
                                                className={classNames(
                                                    "flex w-full items-start justify-between rounded-lg border px-3 py-2 text-left transition",
                                                    isSelected
                                                        ? "border-amber-300 bg-amber-50"
                                                        : "border-stone-200 hover:bg-stone-50",
                                                )}
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-stone-900">
                                                        {unit.unitName} (
                                                        {unit.unitCode})
                                                    </p>
                                                    <p className="text-[11px] text-stone-500">
                                                        {unit.baseUnitCode
                                                            ? `Converts to ${unit.baseUnitCode}`
                                                            : "Base unit"}
                                                        {" · "}Factor:{" "}
                                                        {formatConversionFactor(
                                                            unit.conversionFactor,
                                                        )}
                                                    </p>
                                                </div>
                                                {isSelected ? (
                                                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                                                        Selected
                                                    </span>
                                                ) : null}
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50 px-3 py-5 text-center text-xs text-stone-500">
                                        No units found for this unit type.
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ) : null}
        </div>
    );
}
