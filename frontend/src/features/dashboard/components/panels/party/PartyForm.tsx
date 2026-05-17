"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Plus } from "lucide-react";

import { PARTY_TYPES } from "@/features/party/constants";
import { useCreateParty, useUpdateParty } from "@/features/party/hooks";
import type { PartyFormValues, PartyRecord } from "@/features/party/types";

import { classNames, extractValidationState } from "./utils";

function Field({
    label,
    children,
    error,
}: {
    label: string;
    children: ReactNode;
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

export function PartyForm({
    mode,
    initialValue,
    onDone,
    onCancel,
}: {
    mode: "create" | "edit";
    initialValue?: PartyRecord;
    onDone: () => void;
    onCancel?: () => void;
}) {
    const { mutate: createMut, isPending: creating } = useCreateParty();
    const { mutate: updateMut, isPending: updating } = useUpdateParty();

    const [name, setName] = useState(initialValue?.name ?? "");
    const [type, setType] = useState<PartyFormValues["type"]>(
        initialValue?.type ?? "FARMER",
    );
    const [contactNumber, setContactNumber] = useState(
        initialValue?.contactNumber ?? "",
    );
    const [address, setAddress] = useState(initialValue?.address ?? "");
    const [village, setVillage] = useState(initialValue?.village ?? "");
    const [description, setDescription] = useState(
        initialValue?.description ?? "",
    );
    const [formError, setFormError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const submitting = creating || updating;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name.trim()) {
            setFieldErrors({ name: "Party name is required" });
            setFormError("Validation failed");
            return;
        }

        if (!contactNumber.trim()) {
            setFieldErrors({
                contactNumber: "Party contact number is required",
            });
            setFormError("Validation failed");
            return;
        }

        setFieldErrors({});
        setFormError(null);

        const payload: PartyFormValues = {
            name: name.trim(),
            type,
            contactNumber: contactNumber.trim(),
            address: address.trim(),
            village: village.trim(),
            description: description.trim(),
        };

        const onError = (error: unknown) => {
            const nextState = extractValidationState(error);
            setFieldErrors(nextState.fieldErrors);
            setFormError(nextState.formError);
        };

        if (mode === "edit" && initialValue) {
            updateMut(
                {
                    id: initialValue.id,
                    name: payload.name,
                    type: payload.type,
                    contactNumber: payload.contactNumber,
                    address: payload.address,
                    village: payload.village,
                    description: payload.description,
                },
                {
                    onSuccess: () => onDone(),
                    onError,
                },
            );
            return;
        }

        createMut(payload, {
            onSuccess: () => {
                setName("");
                setType("FARMER");
                setContactNumber("");
                setAddress("");
                setVillage("");
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
            <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Party name" error={fieldErrors.name}>
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Bharat Agro"
                        className={classNames(
                            "w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none",
                            fieldErrors.name
                                ? "border-red-300 focus:border-red-500"
                                : "border-stone-300 focus:border-amber-500",
                        )}
                        required
                    />
                </Field>

                <Field label="Party type" error={fieldErrors.type}>
                    <select
                        value={type}
                        onChange={(event) =>
                            setType(
                                event.target.value as PartyFormValues["type"],
                            )
                        }
                        className={classNames(
                            "w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 focus:outline-none",
                            fieldErrors.type
                                ? "border-red-300 focus:border-red-500"
                                : "border-stone-300 focus:border-amber-500",
                        )}
                    >
                        {PARTY_TYPES.map((entry) => (
                            <option key={entry.value} value={entry.value}>
                                {entry.label}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Contact number" error={fieldErrors.contactNumber}>
                    <input
                        value={contactNumber}
                        onChange={(event) =>
                            setContactNumber(event.target.value)
                        }
                        placeholder="9876543210"
                        className={classNames(
                            "w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none",
                            fieldErrors.contactNumber
                                ? "border-red-300 focus:border-red-500"
                                : "border-stone-300 focus:border-amber-500",
                        )}
                        required
                    />
                </Field>

                <Field label="Village" error={fieldErrors.village}>
                    <input
                        value={village}
                        onChange={(event) => setVillage(event.target.value)}
                        placeholder="Rau"
                        className={classNames(
                            "w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none",
                            fieldErrors.village
                                ? "border-red-300 focus:border-red-500"
                                : "border-stone-300 focus:border-amber-500",
                        )}
                    />
                </Field>
            </div>

            <Field label="Address" error={fieldErrors.address}>
                <textarea
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Warehouse / market address"
                    className={classNames(
                        "min-h-24 w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none",
                        fieldErrors.address
                            ? "border-red-300 focus:border-red-500"
                            : "border-stone-300 focus:border-amber-500",
                    )}
                />
            </Field>

            <Field label="Description" error={fieldErrors.description}>
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Trade relationship notes"
                    className={classNames(
                        "min-h-24 w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none",
                        fieldErrors.description
                            ? "border-red-300 focus:border-red-500"
                            : "border-stone-300 focus:border-amber-500",
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
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
                >
                    <Plus className="h-4 w-4" />
                    {mode === "edit"
                        ? updating
                            ? "Updating..."
                            : "Update party"
                        : creating
                          ? "Saving..."
                          : "Save party"}
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
