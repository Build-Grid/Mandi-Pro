import { Link } from "react-router";

import { AUTH_REGISTER_COPY } from "~/constants/content";
import { APP_ROUTES } from "~/constants/routes";

export default function RegisterPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">
                    {AUTH_REGISTER_COPY.title}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    {AUTH_REGISTER_COPY.subtitle}
                </p>
            </header>

            <form className="space-y-4" noValidate>
                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-slate-700"
                        htmlFor="firm-name"
                    >
                        {AUTH_REGISTER_COPY.firmNameLabel}
                    </label>
                    <input
                        id="firm-name"
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500"
                        placeholder={AUTH_REGISTER_COPY.firmNamePlaceholder}
                    />
                </div>

                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-slate-700"
                        htmlFor="owner-name"
                    >
                        {AUTH_REGISTER_COPY.ownerNameLabel}
                    </label>
                    <input
                        id="owner-name"
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500"
                        placeholder={AUTH_REGISTER_COPY.ownerNamePlaceholder}
                    />
                </div>

                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-slate-700"
                        htmlFor="owner-email"
                    >
                        {AUTH_REGISTER_COPY.ownerEmailLabel}
                    </label>
                    <input
                        id="owner-email"
                        type="email"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500"
                        placeholder={AUTH_REGISTER_COPY.ownerEmailPlaceholder}
                    />
                </div>

                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-slate-700"
                        htmlFor="register-password"
                    >
                        {AUTH_REGISTER_COPY.passwordLabel}
                    </label>
                    <input
                        id="register-password"
                        type="password"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500"
                        placeholder={AUTH_REGISTER_COPY.passwordPlaceholder}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                    {AUTH_REGISTER_COPY.submitButtonLabel}
                </button>
            </form>

            <p className="text-sm text-slate-600">
                {AUTH_REGISTER_COPY.loginPrompt}{" "}
                <Link
                    to={APP_ROUTES.authLogin}
                    className="font-semibold text-emerald-700 hover:underline"
                >
                    {AUTH_REGISTER_COPY.loginLinkLabel}
                </Link>
            </p>
        </div>
    );
}
