import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppProviders } from "@/providers/AppProviders";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Mandi Pro",
    description:
        "Smart trading management platform for mandi-based businesses.",
    icons: {
        icon: [
            { url: "/icons/favicon.ico" },
            {
                url: "/icons/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/icons/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
        ],
        apple: "/icons/apple-touch-icon.png",
    },
    manifest: "/icons/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
