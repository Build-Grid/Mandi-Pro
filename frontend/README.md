# Mandi Pro Frontend

Production-oriented React Router frontend for firm management and trade operations.

## Stack

- React + React Router (file-config route tree)
- TypeScript
- Tailwind CSS
- Axios (centralized API client)
- Redux Toolkit + React Redux (global UI/application state)

## Route Map

### Public

- `/landing` -> Landing page with header and footer
- `/auth/login` -> Login page
- `/auth/register` -> Register firm and owner page

### App Shell (Sidebar + Header)

- `/` -> Home dashboard
- `/FIRM` -> Firm management
- `/FIRM/USER` -> Firm user management
- `/FIRM/INVENTORY` -> Firm inventory
- `/TRADE` -> Trade entry
- `/TBD` -> Reserved feature route
- `/PROFILE/USER` -> User profile
- `/PROFILE/FIRM` -> Firm profile
- `/PROFILE/USER/CHANGE-PASSWORD` -> Change password

## Folder Structure

```txt
app/
	api/
		httpClient.ts
	components/
		common/
		layout/
	config/
		env.ts
	routes/
		app-shell.tsx
		landing.tsx
		auth/
		firm/
		profile/
	store/
		index.ts
		hooks.ts
		slices/
```

## Environment Profiles (HTTP/HTTPS)

This project supports protocol switching via profile-specific env files.

### Development Profile

File: `.env.development`

```env
VITE_APP_ENV=development
VITE_API_PROTOCOL=http
VITE_API_HOST=localhost
VITE_API_PORT=3000
VITE_API_BASE_PATH=/api
```

### Production Profile

File: `.env.production`

```env
VITE_APP_ENV=production
VITE_API_PROTOCOL=https
VITE_API_HOST=api.mandi-pro.com
VITE_API_PORT=443
VITE_API_BASE_PATH=/api
```

`app/config/env.ts` builds the runtime API base URL from these variables.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open app:

- `http://localhost:5173/landing` for public landing
- `http://localhost:5173/` for app shell

## Build and Serve

1. Build:

```bash
npm run build
```

2. Start server build:

```bash
npm run start
```

## Notes For Future Development

- Use `app/api/httpClient.ts` for all HTTP calls. Add feature-specific API modules under `app/api/`.
- Keep route components thin. Move reusable logic to `components/`, `store/`, and dedicated service modules.
- Replace placeholder page content with feature modules incrementally without changing route contracts.
- If auth is introduced, implement route guards around app-shell routes and central token handling in Axios interceptors.
