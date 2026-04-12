# ⚙️ Backend Setup

Full configuration reference for the Spring Boot backend.

---

## Tech Stack

- **Java 21** · **Spring Boot 3.4.1** · **MySQL 8.0+**
- **Spring Security 6** (stateless JWT)
- **Flyway 9.22.3** (auto-migrations)
- **Springdoc OpenAPI 2.7.0** (Swagger UI)

---

## Environment Variables

Copy `.env.example` to `.env` (or `.env.development` / `.env.production`) and fill in the values.

### Database

| Variable | Example | Description |
|---|---|---|
| `DB_URL` | `jdbc:mysql://localhost:3306/mandipro-db` | Full JDBC connection URL |
| `DB_USERNAME` | `root` | MySQL user |
| `DB_PASSWORD` | `secret` | MySQL password |
| `DB_POOL_SIZE` | `10` | HikariCP connection pool size |

### JWT

| Variable | Example | Description |
|---|---|---|
| `JWT_SECRET` | *(64+ char string)* | HMAC-SHA signing key — **change in production** |
| `JWT_ACCESS_EXPIRY_MS` | `900000` | Access token TTL (15 min) |
| `JWT_REFRESH_EXPIRY_MS` | `604800000` | Refresh token TTL (7 days) |

### Application

| Variable | Example | Description |
|---|---|---|
| `ALLOWED_ORIGINS` | `http://localhost:5173` | Comma-separated allowed CORS origins |
| `APP_NAME` | `MandiPro` | Display name |
| `APP_VERSION` | `0.0.2` | Semantic version shown in Swagger |
| `LOG_LEVEL` | `INFO` | Root log level |
| `SWAGGER_ENABLED` | `false` | Enable/disable Swagger UI (`true` in dev) |
| `SPRING_PROFILE` | `dev` | Active Spring profile (`dev` / `prod`) |

### Auth Cookie Settings

| Variable | Default | Description |
|---|---|---|
| `APP_COOKIE_HTTP_ONLY` | `true` | Prevent JS access to auth cookies |
| `APP_COOKIE_SECURE` | `false` (dev) / `true` (prod) | Require HTTPS for cookies |
| `APP_COOKIE_SAME_SITE` | `Strict` (dev) / `None` (prod) | SameSite policy |
| `APP_COOKIE_DOMAIN` | *(empty)* | Cookie domain (set for prod) |
| `APP_COOKIE_PATH` | `/` | Cookie path scope |

### Email (Password Reset)

| Variable | Example | Description |
|---|---|---|
| `MAIL_HOST` | `smtp.gmail.com` | SMTP host |
| `MAIL_PORT` | `587` | SMTP port (TLS) |
| `MAIL_USERNAME` | `noreply@mandipro.com` | Sender email |
| `MAIL_PASSWORD` | *(app password)* | SMTP password or app-specific password |
| `PASSWORD_RESET_EXPIRY_MINUTES` | `15` | Token expiry for password reset links |
| `PASSWORD_RESET_BASE_URL` | `http://localhost:5173/reset-password` | Frontend reset URL |

---

## Spring Profiles

### `dev` profile

- Swagger UI enabled
- Cookies: HTTP, `SameSite=Strict`, not secure
- Verbose logging

Run with:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### `prod` profile

- Swagger UI disabled
- Cookies: HTTPS, `SameSite=None`, secure
- Minimized logging

Run with:
```bash
java -jar target/MandiPro-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

---

## Build

```bash
# Compile and package (skip tests)
mvn clean package -DskipTests

# Run all tests
mvn test

# Full build with tests
mvn clean verify
```

Output JAR: `target/MandiPro-0.0.1-SNAPSHOT.jar`

---

## Database Migrations

Flyway runs automatically on startup. Migration files live at:

```
backend/src/main/resources/db/migration/
```

Naming convention: `V<number>__<description>.sql`

| File | Description |
|---|---|
| `V1__auth_db_schema.sql` | Core tables: roles, firms, users, refresh_tokens |
| `V2__password_reset_tokens.sql` | Password reset token table |
| `V3__firm_invites.sql` | Firm invite table + plan_type column on firms |
| `V4__add_elite_firm.sql` | Elite firm seed data |
| `V5__Unique_Contraints_Generated_Columns.sql` | Unique constraints and generated columns |

To add a new migration:
1. Create `V<next_number>__<description>.sql`
2. Write MySQL 8.0+ compatible SQL
3. Restart the application — Flyway applies it automatically

---

## Observability

### Trace ID

Every HTTP request receives a unique `X-Trace-Id` UUID response header for distributed tracing.

### Logging

All log lines include the `traceId` in MDC:

```
[2026-03-18 23:11:19.433] [INFO] [traceId=a1b2c3d4-e5f6-7890-abcd-ef1234567890] AuthController - Login successful
```

### Swagger UI

Available at `http://localhost:8080/swagger-ui/index.html` when `SWAGGER_ENABLED=true` (dev profile).

---

## Adding a New Feature (Backend Checklist)

1. **Migration** — `V<N>__<description>.sql` for new tables/columns
2. **Entity** — extend `BaseEntity` in `entity/`
3. **Repository** — `JpaRepository<Entity, Long>` in `repository/`
4. **DTOs** — request/response records in `dto/request/` and `dto/response/`
5. **Mapper** — MapStruct mapper in `dto/mapper/`
6. **Service** — interface in `service/`, implementation in `service/impl/`
7. **Controller** — `@RestController` in `controller/`, add path constant to `ApiPaths`
8. **Security** — add any new paths to Spring Security config if needed
