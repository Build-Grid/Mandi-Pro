import { BRANDING, FOOTER_COPY } from "~/constants/branding";

export function PublicFooter() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:px-8">
                <p>
                    © {new Date().getFullYear()} {BRANDING.applicationName}.{" "}
                    {FOOTER_COPY.productPitch}
                </p>
                <p>{FOOTER_COPY.securityStatement}</p>
            </div>
        </footer>
    );
}
