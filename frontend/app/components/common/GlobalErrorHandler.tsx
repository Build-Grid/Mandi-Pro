import { useEffect, type PropsWithChildren } from "react";

import { GlobalErrorBanner } from "~/components/common/GlobalErrorBanner";
import { useAppDispatch } from "~/store/hooks";
import { setGlobalError } from "~/store/slices/errorSlice";
import {
    normalizeRuntimeError,
    normalizeUnhandledRejection,
} from "~/utils/errorHandling";

export function GlobalErrorHandler({ children }: PropsWithChildren) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const onError = (event: ErrorEvent) => {
            dispatch(setGlobalError(normalizeRuntimeError(event)));
        };

        const onUnhandledRejection = (event: PromiseRejectionEvent) => {
            dispatch(setGlobalError(normalizeUnhandledRejection(event)));
        };

        window.addEventListener("error", onError);
        window.addEventListener("unhandledrejection", onUnhandledRejection);

        return () => {
            window.removeEventListener("error", onError);
            window.removeEventListener(
                "unhandledrejection",
                onUnhandledRejection,
            );
        };
    }, [dispatch]);

    return (
        <>
            <GlobalErrorBanner />
            {children}
        </>
    );
}
