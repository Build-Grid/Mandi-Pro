# 🗄️ Database Schema & Migrations

MandiPro uses **MySQL 8.0+** with **Flyway** for version-controlled schema migrations.

---

## Migration Files

Located at: `backend/src/main/resources/db/migration/`

| Version | File | Description |
|---|---|---|
| V1 | `V1__auth_db_schema.sql` | Core auth: roles, firms, users, refresh_tokens |
| V2 | `V2__password_reset_tokens.sql` | Password reset token table |
| V3 | `V3__firm_invites.sql` | Firm invites table + `plan_type` on firms |
| V4 | `V4__add_elite_firm.sql` | Elite firm seed data |
| V5 | `V5__Unique_Contraints_Generated_Columns.sql` | Unique constraints, generated columns |

Flyway runs migrations automatically on application startup. No manual execution needed.

---

## Schema

### `roles`

Stores the system roles available in the platform.

| Column | Type | Notes |
|---|---|---|
| `role_id` | BIGINT PK | Auto-increment |
| `role_name` | VARCHAR(50) UNIQUE | `ADMIN`, `OWNER`, `MANAGER`, `EMPLOYEE` |
| `description` | VARCHAR(255) | Human-readable description |
| *(audit fields)* | | See Audit Fields section |

**Seed data (V1):** `ADMIN`, `OWNER`, `MANAGER`, `EMPLOYEE`

---

### `firms`

Represents a business/organization on the platform.

| Column | Type | Notes |
|---|---|---|
| `firm_id` | BIGINT PK | Auto-increment |
| `firm_name` | VARCHAR(255) | Display name |
| `plan_type` | VARCHAR(20) | `STANDARD` (default) or `ELITE` |
| *(audit fields)* | | |

---

### `users`

User accounts. Each user belongs to a firm and has one role.

| Column | Type | Notes |
|---|---|---|
| `user_id` | BIGINT PK | Auto-increment |
| `username` | VARCHAR(255) | Uppercased email used as username |
| `first_name` | VARCHAR(255) | |
| `last_name` | VARCHAR(255) | |
| `email` | VARCHAR(255) UNIQUE | Login identifier |
| `password` | VARCHAR(255) | BCrypt hashed |
| `firm_id` | BIGINT FK → firms | Nullable (ADMIN users may have none) |
| `role_id` | BIGINT FK → roles | Not null |
| *(audit fields)* | | |

---

### `refresh_tokens`

Persisted refresh tokens for token validation and revocation.

| Column | Type | Notes |
|---|---|---|
| `id` | BIGINT PK | Auto-increment |
| `token` | VARCHAR(255) UNIQUE | JWT refresh token string |
| `user_id` | BIGINT FK → users | Token owner |
| *(audit fields)* | | |

---

### `password_reset_tokens`

Short-lived tokens for the forgot-password flow.

| Column | Type | Notes |
|---|---|---|
| `id` | BIGINT PK | Auto-increment |
| `token` | VARCHAR(255) UNIQUE | UUID token sent via email |
| `user_id` | BIGINT FK → users | Target user |
| `expires_at` | TIMESTAMP | Token expiry (15 min default) |
| `used` | BOOLEAN | Whether token has been consumed |
| *(audit fields)* | | |

---

### `firm_invites`

Invitation records for adding users to a firm.

| Column | Type | Notes |
|---|---|---|
| `id` | CHAR(36) PK | UUID |
| `firm_id` | BIGINT FK → firms | Inviting firm |
| `email` | VARCHAR(255) | Invitee email |
| `username` | VARCHAR(255) | Proposed username |
| `role` | VARCHAR(50) | `MANAGER` or `EMPLOYEE` |
| `invited_by_user_id` | BIGINT FK → users | Who sent the invite |
| `token` | VARCHAR(255) UNIQUE | Secure invite token |
| `invite_status` | VARCHAR(20) | `PENDING`, `ACCEPTED`, `CANCELLED`, `EXPIRED` |
| `expires_at` | TIMESTAMP | Invite expiry |
| *(audit fields)* | | |

---

## Audit Fields (All Tables)

Every table inherits these fields via the `BaseEntity` JPA class:

| Column | Type | Notes |
|---|---|---|
| `created_at` | TIMESTAMP | Set on insert, never updated |
| `updated_at` | TIMESTAMP | Auto-updated by MySQL `ON UPDATE CURRENT_TIMESTAMP` |
| `created_by` | VARCHAR(255) | Username of the creator (from Spring Security context) |
| `updated_by` | VARCHAR(255) | Username of the last updater |
| `status` | VARCHAR(20) | `ACTIVE`, `INACTIVE`, `CANCEL` |

> Audit `created_by`/`updated_by` fields store the **uppercased username** (not email) via `AuditorAwareImpl`.

---

## Adding a New Table

1. **Create migration file:**
   ```
   backend/src/main/resources/db/migration/V6__create_products_table.sql
   ```

2. **Write MySQL 8.0+ SQL:**
   ```sql
   CREATE TABLE IF NOT EXISTS products (
       product_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
       product_name VARCHAR(255) NOT NULL,
       firm_id      BIGINT NOT NULL,
       created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
       updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       created_by   VARCHAR(255),
       updated_by   VARCHAR(255),
       status       VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
       CONSTRAINT fk_products_firms FOREIGN KEY (firm_id) REFERENCES firms(firm_id)
   );
   ```

3. **Restart backend** — Flyway picks it up automatically.

4. **Create JPA Entity** extending `BaseEntity`:
   ```java
   @Entity
   @Table(name = "products")
   public class Product extends BaseEntity {
       @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long productId;
       // ...
   }
   ```

---

## Migration Rules

- ✅ Always use `CREATE TABLE IF NOT EXISTS`
- ✅ Use `BIGINT AUTO_INCREMENT PRIMARY KEY` for numeric IDs
- ✅ Use `CHAR(36)` for UUID primary keys
- ✅ Include all audit fields on every table
- ❌ Never modify or delete an existing migration file
- ❌ Never use PostgreSQL-specific syntax (`SERIAL`, `RETURNING`, etc.)
