import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import { Provider } from "react-redux";

import { GlobalErrorHandler } from "./components/common/GlobalErrorHandler";
import { ERROR_COPY, HTTP_STATUS_CODES } from "./constants/errors";
import type { Route } from "./+types/root";
import { store } from "./store";
import "./app.css";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Instrument+Sans:wght@400;500;600;700&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <GlobalErrorHandler>
                <Outlet />
            </GlobalErrorHandler>
        </Provider>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = ERROR_COPY.fallbackMessage;
    let details = ERROR_COPY.fallbackDetails;
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message =
            error.status === HTTP_STATUS_CODES.notFound
                ? ERROR_COPY.notFoundMessage
                : ERROR_COPY.routeErrorMessage;
        details =
            error.status === HTTP_STATUS_CODES.notFound
                ? ERROR_COPY.notFoundDetails
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
