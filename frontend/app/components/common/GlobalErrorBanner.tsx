import { ERROR_COPY } from "~/constants/errors";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { clearGlobalError } from "~/store/slices/errorSlice";

export function GlobalErrorBanner() {
    const dispatch = useAppDispatch();
    const activeError = useAppSelector((state) => state.error.activeError);

    if (!activeError) {
        return null;
    }

    return (
        <div className="fixed inset-x-0 top-0 z-50 bg-rose-600 px-4 py-3 text-white shadow-lg">
            <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold">
                        {ERROR_COPY.bannerTitle}
                    </p>
                    <p className="text-sm opacity-95">{activeError.message}</p>
                    {activeError.details ? (
                        <p className="text-xs opacity-90">
                            {activeError.details}
                        </p>
                    ) : null}
                </div>

                <button
                    type="button"
                    onClick={() => dispatch(clearGlobalError())}
                    className="rounded border border-rose-200 px-3 py-1 text-xs font-semibold transition hover:bg-rose-500"
                >
                    {ERROR_COPY.closeAction}
                </button>
            </div>
        </div>
    );
}
