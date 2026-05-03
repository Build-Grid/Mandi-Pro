"use client";

import { useAuthGuard } from "@/features/auth/hooks";
import RegisterForm from "./RegisterForm";

export default function RegisterGuard() {
    const { isLoading } = useAuthGuard();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="space-y-4 text-center">
                    <div className="inline-block rounded-full border-4 border-stone-200 border-t-emerald-700 p-3 animate-spin">
                        <div className="h-6 w-6" />
                    </div>
                    <p className="text-sm text-stone-600">
                        Checking authentication...
                    </p>
                </div>
            </div>
        );
    }

    return <RegisterForm />;
}
