import { AppError } from "@/lib/errors";

export function classNames(
    ...values: Array<string | false | null | undefined>
) {
    return values.filter(Boolean).join(" ");
}

export function extractValidationState(error: unknown): {
    formError: string | null;
    fieldErrors: Record<string, string>;
} {
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
