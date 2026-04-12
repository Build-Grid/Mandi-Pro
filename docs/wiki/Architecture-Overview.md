# 🏗 Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────┐
│              Browser (User)             │
└───────────────────┬─────────────────────┘
                    │  HTTPS
                    ▼
┌─────────────────────────────────────────┐
│         React Frontend (SSR)            │
│   React Router · TypeScript · Tailwind  │
│   Redux Toolkit · Axios                 │
└───────────────────┬─────────────────────┘
                    │  REST / JSON  (HTTP Cookies: ACCESS_TOKEN, REFRESH_TOKEN)
                    ▼
┌─────────────────────────────────────────┐
│      Spring Boot REST API (Backend)     │
│   Java 21 · Spring Security 6 · JWT    │
│   Flyway Migrations · MapStruct         │
└───────────────────┬─────────────────────┘
                    │  JDBC / JPA
                    ▼
┌─────────────────────────────────────────┐
│         MySQL 8.0+ Database             │
└─────────────────────────────────────────┘
```

---

## Tech Stack

### Backend

| Technology | Version | Role |
|---|---|---|
| Java | 21 (LTS) | Runtime language |
| Spring Boot | 3.4.1 | Application framework |
| Spring Security | 6 | Stateless JWT authentication |
| MySQL | 8.0+ | Primary relational database |
| Flyway | 9.22.3 | Database schema migrations |
| Hibernate | 6.6.4 | ORM |
| MapStruct | 1.6.3 | DTO ↔ Entity mapping |
| Lombok | 1.18.42 | Boilerplate reduction |
| Springdoc OpenAPI | 2.7.0 | Swagger UI / API docs |

### Frontend

| Technology | Role |
|---|---|
| React + React Router | UI framework with SSR enabled |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP client (centralized in `httpClient.ts`) |
| Redux Toolkit | Global application state |

---

## Key Design Decisions

### Stateless JWT Authentication

The backend uses **stateless JWT**. No server-side session is maintained. Every request is authenticated by validating the `ACCESS_TOKEN` cookie (or `Authorization: Bearer` header).

### Cookie-Based Token Transport

Tokens are transported as HTTP-only cookies for security:

| Cookie | Lifetime | Purpose |
|---|---|---|
| `ACCESS_TOKEN` | 15 min (default) | Authenticate API requests |
| `REFRESH_TOKEN` | 7 days (default) | Obtain new access tokens |

### Audit Trail on Every Entity

All database tables extend `BaseEntity`, which automatically records:
- `created_at`, `updated_at` — timestamps
- `created_by`, `updated_by` — the acting user's username (uppercased)
- `status` — lifecycle status (`ACTIVE`, `INACTIVE`, `CANCEL`)

### Distributed Tracing

Every HTTP request is assigned a unique `X-Trace-Id` header (UUID). This trace ID is added to the logging MDC so all log lines for a single request are correlated.

---

## Repository Structure

```
Mandi-Pro/
├── backend/                   Spring Boot application
│   ├── src/main/java/         Java source code
│   │   └── com/buildgrid/mandipro/
│   │       ├── controller/    REST endpoints
│   │       ├── service/       Business logic
│   │       ├── entity/        JPA entities
│   │       ├── dto/           Request / Response DTOs
│   │       ├── repository/    Spring Data JPA repos
│   │       ├── security/      JWT filter, utils
│   │       ├── exception/     Custom exceptions
│   │       ├── payload/       ApiResponse wrapper
│   │       ├── filter/        Trace ID filter
│   │       ├── audit/         JPA auditing
│   │       ├── constants/     API paths, roles, etc.
│   │       └── util/          Helpers
│   └── src/main/resources/
│       ├── db/migration/      Flyway SQL migrations
│       └── application*.properties
│
└── frontend/                  React application
    └── app/
        ├── api/               Axios HTTP client
        ├── components/        Shared UI components
        ├── config/            Env configuration
        ├── routes/            Route components
        ├── store/             Redux slices
        └── utils/             Helpers
```
