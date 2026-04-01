import { PageContainer } from "~/components/common/PageContainer";
import { PAGE_COPY } from "~/constants/content";

export default function ChangePasswordPage() {
    return (
        <PageContainer
            title={PAGE_COPY.changePassword.title}
            description={PAGE_COPY.changePassword.description}
        >
            <form className="max-w-lg space-y-4" noValidate>
                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-slate-700"
                        htmlFor="current-password"
                    >
                        {PAGE_COPY.changePassword.currentPasswordLabel}
                    </label>
                    <input
                        id="current-password"
                        type="password"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500"
                    />
                </div>

                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-slate-700"
                        htmlFor="new-password"
                    >
                        {PAGE_COPY.changePassword.newPasswordLabel}
                    </label>
                    <input
                        id="new-password"
                        type="password"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                    {PAGE_COPY.changePassword.submitButtonLabel}
                </button>
            </form>
        </PageContainer>
    );
}
