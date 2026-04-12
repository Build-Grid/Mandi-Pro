# 🎨 Frontend Setup

Full configuration reference for the React frontend.

---

## Tech Stack

| Technology | Role |
|---|---|
| React + React Router | UI framework with SSR (`ssr: true`) |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP client (see `app/api/httpClient.ts`) |
| Redux Toolkit | Global state management |
| Vite | Build tool and dev server |

---

## Environment Variables

Copy `.env.example` to the correct profile file and adjust values.

### Development

File: `frontend/.env.development`

```env
VITE_APP_ENV=development
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_API_PROTOCOL=http
VITE_API_HOST=localhost
VITE_API_PORT=8080
VITE_API_BASE_PATH=/api/v1
```

### Production

File: `frontend/.env.production`

```env
VITE_APP_ENV=production
VITE_API_BASE_URL=https://api.mandi-pro.com/api/v1
VITE_API_PROTOCOL=https
VITE_API_HOST=api.mandi-pro.com
VITE_API_PORT=443
VITE_API_BASE_PATH=/api/v1
```

> `app/config/env.ts` assembles `VITE_API_BASE_URL` from these variables at runtime.

---

## Running Locally

```bash
cd frontend
npm install
npm run dev
```

App starts at `http://localhost:5173`.

---

## Build & Serve

```bash
# Production build (SSR)
npm run build

# Start the SSR server
npm run start
```

---

## Route Map

### Public Routes (no auth required)

| Path | Component | Description |
|---|---|---|
| `/landing` | `landing.tsx` | Public landing page |
| `/auth/login` | `auth/login` | User login |
| `/auth/register` | `auth/register` | Register new firm + owner |

### App Shell (requires authentication)

All routes below are nested inside the app shell (sidebar + header layout):

| Path | Description |
|---|---|
| `/` | Home / Dashboard |
| `/FIRM` | Firm overview |
| `/FIRM/USER` | Firm user management |
| `/FIRM/INVENTORY` | Firm inventory |
| `/TRADE` | Trade entry |
| `/TBD` | Reserved for future feature |
| `/PROFILE/USER` | Current user profile |
| `/PROFILE/FIRM` | Firm profile |
| `/PROFILE/USER/CHANGE-PASSWORD` | Change password |

---

## Folder Structure

```
frontend/app/
├── api/
│   └── httpClient.ts         Axios instance (base URL, interceptors)
├── components/
│   ├── common/               Reusable UI components
│   └── layout/               Shell layout (sidebar, header)
├── config/
│   └── env.ts                Reads VITE_* env vars, exports API base URL
├── constants/                Shared frontend constants
├── routes/
│   ├── app-shell.tsx         Root layout with sidebar/header
│   ├── landing.tsx           Public landing layout
│   ├── auth/                 Login and register pages
│   ├── firm/                 Firm management pages
│   └── profile/              User and firm profile pages
├── store/
│   ├── index.ts              Redux store configuration
│   ├── hooks.ts              Typed useDispatch / useSelector
│   └── slices/               Redux slices (per feature)
└── utils/                    Frontend helper utilities
```

---

## Development Guidelines

- **All HTTP calls** must go through `app/api/httpClient.ts`. Add feature-specific modules under `app/api/` (e.g., `app/api/firmApi.ts`).
- **Keep route components thin.** Business logic belongs in `store/slices/` or service modules.
- **Auth guard:** Unauthenticated users should be redirected from app-shell routes. Implement route guards around protected routes.
- **Token handling:** Access and refresh tokens arrive as HTTP-only cookies — do not read them in JavaScript. Use the `/api/v1/auth/refresh` endpoint for silent token renewal in Axios interceptors.
- **Incremental replacement:** Replace placeholder pages with feature modules without changing route path contracts.
