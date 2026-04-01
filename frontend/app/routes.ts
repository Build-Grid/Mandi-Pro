import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { APP_ROUTES, APP_ROUTE_SEGMENTS } from "./constants/routes";

export default [
    route(APP_ROUTE_SEGMENTS.landing, "routes/landing.tsx"),
    route(APP_ROUTE_SEGMENTS.authRoot, "routes/auth/layout.tsx", [
        route(APP_ROUTE_SEGMENTS.authLogin, "routes/auth/login.tsx"),
        route(APP_ROUTE_SEGMENTS.authRegister, "routes/auth/register.tsx"),
    ]),
    route(APP_ROUTES.home, "routes/app-shell.tsx", [
        index("routes/dashboard.tsx"),
        route(APP_ROUTE_SEGMENTS.firm, "routes/firm/index.tsx"),
        route(APP_ROUTE_SEGMENTS.firmUser, "routes/firm/user.tsx"),
        route(APP_ROUTE_SEGMENTS.firmInventory, "routes/firm/inventory.tsx"),
        route(APP_ROUTE_SEGMENTS.trade, "routes/trade.tsx"),
        route(APP_ROUTE_SEGMENTS.tbd, "routes/tbd.tsx"),
        route(APP_ROUTE_SEGMENTS.profileUser, "routes/profile/user.tsx"),
        route(APP_ROUTE_SEGMENTS.profileFirm, "routes/profile/firm.tsx"),
        route(
            APP_ROUTE_SEGMENTS.profileUserChangePassword,
            "routes/profile/change-password.tsx",
        ),
    ]),
] satisfies RouteConfig;
