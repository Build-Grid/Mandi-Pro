"use client";

import type { Firm, User } from "@/common/types";
import { FirmSettingsPanel } from "./FirmSettingsPanel";
import { UserManagementPanel } from "./UserManagementPanel";

export type AdminPanelMode = "all" | "users" | "firm";

export function AdminPanel({
    user,
    firm,
    mode = "all",
}: {
    user: User;
    firm: Firm;
    mode?: AdminPanelMode;
}) {
    const showUsersCards = mode === "all" || mode === "users";
    const showFirmCards = mode === "all" || mode === "firm";

    return (
        <div className="space-y-8">
            {showUsersCards ? <UserManagementPanel currentUser={user} /> : null}
            {showFirmCards ? (
                <FirmSettingsPanel currentUser={user} firm={firm} />
            ) : null}
        </div>
    );
}
