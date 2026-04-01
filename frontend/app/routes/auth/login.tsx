import { Link } from "react-router";

import { AUTH_LOGIN_COPY } from "~/constants/content";
import { APP_ROUTES } from "~/constants/routes";

export default function LoginPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-slate-900">
                    {AUTH_LOGIN_COPY.title}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    {AUTH_LOGIN_COPY.subtitle}
                </p>
            </header>

            <form className="space-y-4" noValidate>
                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-slate-700"
                        htmlFor="email"
                    >
                        {AUTH_LOGIN_COPY.emailLabel}
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500"
                        placeholder={AUTH_LOGIN_COPY.emailPlaceholder}
                    />
                </div>
                <div>
                    <label
                        className="mb-1 block text-sm font-medium text-slate-700"
                        htmlFor="password"
                    >
                        {AUTH_LOGIN_COPY.passwordLabel}
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500"
                        placeholder={AUTH_LOGIN_COPY.passwordPlaceholder}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                    {AUTH_LOGIN_COPY.submitButtonLabel}
                </button>
            </form>

            <p className="text-sm text-slate-600">
                {AUTH_LOGIN_COPY.registerPrompt}{" "}
                <Link
                    to={APP_ROUTES.authRegister}
                    className="font-semibold text-emerald-700 hover:underline"
                >
                    {AUTH_LOGIN_COPY.registerLinkLabel}
                </Link>
            </p>
        </div>
    );
}
