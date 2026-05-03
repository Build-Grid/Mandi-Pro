"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/features/auth/hooks";
import DashboardLayout from "./DashboardLayout";
import { logger } from "@/lib/logger";
import Loading from "@/app/loading";

export default function DashboardShell() {
    const router = useRouter();
    const { data: profile, isLoading, error, isPending } = useProfile();

    // ✅ Log user and firm
    useEffect(() => {
        if (profile) {
            logger.info("Profile loaded:", {
                username: profile.user.username,
                role: profile.user.role,
                firmId: profile.user.firmId,
                firmName: profile.firm.name,
                planType: profile.firm.planType,
            });
        }
    }, [profile]);

    // ✅ Handle redirect logic safely
    useEffect(() => {
        if (!isLoading && !isPending) {
            if (error || !profile) {
                logger.warn("Redirecting to login due to auth issue");
                router.push("/login");
            }
        }
    }, [error, profile, router, isLoading, isPending]);

    // Loading UI
    if (isLoading || isPending) {
        return <Loading />;
    }

    // Prevent render while redirecting
    if (error || !profile) {
        return null;
    }

    return <DashboardLayout user={profile.user} firm={profile.firm} />;
}
