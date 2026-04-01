import { APP_ROUTES } from "~/constants/routes";

export const NAVIGATION_COPY = {
    sidebarTitle: "Navigation",
    headerSearchLabel: "Search",
    headerSearchPlaceholder: "Search across firms, entries and inventory",
    profileActionAriaLabel: "Open profile actions",
};

export const PUBLIC_NAV_ITEMS = [
    { to: APP_ROUTES.landing, label: "Landing" },
    { to: APP_ROUTES.authLogin, label: "Login" },
    { to: APP_ROUTES.authRegister, label: "Register" },
] as const;

export const APP_NAV_ITEMS = [
    { label: "FIRM", to: APP_ROUTES.firm },
    { label: "FIRM USER", to: APP_ROUTES.firmUser },
    { label: "FIRM INVENTORY", to: APP_ROUTES.firmInventory },
    { label: "TRADE ENTRY", to: APP_ROUTES.trade },
    { label: "TO BE DECIDED", to: APP_ROUTES.tbd },
] as const;

export const PROFILE_MENU_ITEMS = [
    { label: "Change Profile", to: APP_ROUTES.profileUser },
    { label: "Change Firm Profile", to: APP_ROUTES.profileFirm },
    { label: "Change Password", to: APP_ROUTES.profileUserChangePassword },
] as const;
