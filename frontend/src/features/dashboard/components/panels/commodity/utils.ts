import { AppError } from "@/lib/errors";

export type ValidationState = {
    formError: string | null;
    fieldErrors: Record<string, string>;
};

export function classNames(
    ...values: Array<string | false | null | undefined>
) {
    return values.filter(Boolean).join(" ");
}

export function formatUnitType(unitType: string): string {
    return unitType
        .toLowerCase()
        .split("_")
        .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
        .join(" ");
}

export function formatConversionFactor(value: number): string {
    if (!Number.isFinite(value)) {
        return "N/A";
    }

    return value.toLocaleString("en-IN", {
        useGrouping: false,
        minimumFractionDigits: 0,
        maximumFractionDigits: 12,
    });
}

export function extractValidationState(error: unknown): ValidationState {
    if (!(error instanceof AppError)) {
        return {
            formError: "Something went wrong. Please try again.",
            fieldErrors: {},
        };
    }

    const fallback = error.message || "Request failed";
    const details = error.details;
    const fieldErrors: Record<string, string> = {};

    if (details && typeof details === "object" && "errors" in details) {
        const errors = (details as { errors?: unknown }).errors;

        if (Array.isArray(errors)) {
            for (const entry of errors) {
                if (!entry || typeof entry !== "object") {
                    continue;
                }

                const field = String(
                    (entry as { field?: unknown }).field ?? "",
                );
                const message = String(
                    (entry as { message?: unknown }).message ?? fallback,
                );

                if (field) {
                    fieldErrors[field] = message;
                }
            }
        }
    }

    return {
        formError: fallback,
        fieldErrors,
    };
}
