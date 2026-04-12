# 🚢 Deployment

This guide covers building and deploying MandiPro in a production environment using Docker.

---

## Docker

Both the backend and frontend have `Dockerfile`s for containerized deployment.

### Backend

```bash
cd backend
docker build -t mandipro-backend:latest .
docker run -d \
  --name mandipro-backend \
  -p 8080:8080 \
  --env-file .env \
  mandipro-backend:latest
```

### Frontend

```bash
cd frontend
docker build -t mandipro-frontend:latest .
docker run -d \
  --name mandipro-frontend \
  -p 3000:3000 \
  mandipro-frontend:latest
```

---

## Production Environment Checklist

Before going live, verify every item below.

### Backend (`backend/.env`)

- [ ] `DB_URL` points to production MySQL host
- [ ] `DB_USERNAME` / `DB_PASSWORD` use a non-root production credential
- [ ] `JWT_SECRET` is a unique, 64+ character random string (never reuse dev secret)
- [ ] `JWT_ACCESS_EXPIRY_MS` and `JWT_REFRESH_EXPIRY_MS` are set appropriately
- [ ] `ALLOWED_ORIGINS` contains only your production frontend domain
- [ ] `SWAGGER_ENABLED=false`
- [ ] `SPRING_PROFILE=prod`
- [ ] `APP_COOKIE_SECURE=true`
- [ ] `APP_COOKIE_SAME_SITE=None`
- [ ] `APP_COOKIE_DOMAIN` set to your API domain (e.g., `api.mandi-pro.com`)
- [ ] `MAIL_*` variables configured with production email credentials
- [ ] `PASSWORD_RESET_BASE_URL` points to production frontend URL
- [ ] `LOG_LEVEL=WARN` or `INFO` (avoid `DEBUG` in production)

### Frontend (`frontend/.env.production`)

- [ ] `VITE_API_BASE_URL` points to production backend URL
- [ ] `VITE_API_PROTOCOL=https`
- [ ] `VITE_APP_ENV=production`

### Infrastructure

- [ ] HTTPS enabled on both frontend and backend (TLS certificate)
- [ ] Backend running behind a reverse proxy (nginx / load balancer)
- [ ] Database backups configured
- [ ] Health check endpoint monitored: `GET /api/v1/health`

---

## Spring Profiles

The backend supports two Spring profiles:

| Profile | Use | Key differences |
|---|---|---|
| `dev` | Local development | Swagger enabled, relaxed cookies |
| `prod` | Production | Swagger disabled, secure cookies, `SameSite=None` |

Activate profile with:
```bash
--spring.profiles.active=prod
```
or in `.env`:
```env
SPRING_PROFILE=prod
```

---

## Monitoring & Observability

### Health Check

```
GET /api/v1/health
```

Returns `200 OK` when the application is running. Use this as your load balancer / uptime monitor target.

### Trace IDs

Every request returns `X-Trace-Id` in the response header. Use this ID to correlate logs across services when debugging issues.

### Log Correlation

Logs include the `traceId` in the MDC:
```
[INFO] [traceId=a1b2c3d4-e5f6-7890-abcd-ef1234567890] FirmController - Users fetched
```

---

## Database Migrations in Production

Flyway runs migrations automatically on startup.

> ⚠️ **Never manually modify executed migration files.** Always create a new `V<N>__description.sql` file for schema changes.

Before deploying a new version:
1. Verify the new migration SQL is backward-compatible where possible
2. Test the migration on a staging database first
3. Take a database backup before deploying

---

## Scaling Notes

- The backend is **stateless** — horizontal scaling is straightforward. Point multiple backend instances to the same MySQL database.
- JWT tokens are validated locally (no shared session store needed).
- Refresh tokens are stored in MySQL — all instances share access.
- Sticky sessions are **not required**.
