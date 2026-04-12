# 👤 Role & Permission Model

MandiPro uses a flat role model with four roles. Each user has exactly one role.

---

## Roles

| Role | Description |
|---|---|
| `ADMIN` | Platform-level super admin (Build-Grid internal use) |
| `OWNER` | Firm owner — full control over their firm |
| `MANAGER` | Elevated user — can manage members and invites |
| `EMPLOYEE` | Standard firm member |

---

## Permission Matrix

| Action | ADMIN | OWNER | MANAGER | EMPLOYEE |
|---|:---:|:---:|:---:|:---:|
| **Authentication** | | | | |
| Login | ✅ | ✅ | ✅ | ✅ |
| Register firm | ✅ | ✅ | ✅ | ✅ |
| Accept invite | ✅ | ✅ | ✅ | ✅ |
| Forgot / reset password | ✅ | ✅ | ✅ | ✅ |
| Update own profile | ✅ | ✅ | ✅ | ✅ |
| Change own password | ✅ | ✅ | ✅ | ✅ |
| **Firm Management** | | | | |
| List firm users | ✅ | ✅ | ✅ | ❌ |
| View user details | ✅ | ✅ | ✅ | ❌ |
| Remove user from firm | ✅ | ✅ | ✅ | ❌ |
| Update firm profile (name) | ✅ | ✅ | ❌ | ❌ |
| Promote / demote user role | ✅ | ✅ | ✅ | ❌ |
| Deactivate (cancel) firm | ✅ | ✅ | ❌ | ❌ |
| **Invitations** | | | | |
| Send invitation | ✅ | ✅ | ✅ | ❌ |
| List invitations | ✅ | ✅ | ✅ | ❌ |
| Cancel invitation | ✅ | ✅ | ✅ | ❌ |
| Resend invitation | ✅ | ✅ | ✅ | ❌ |

---

## Role Promotion Rules

When using `PUT /api/v1/firm/user/{userId}/role`, only the following role changes are permitted:

| From | To | Allowed by |
|---|---|---|
| `EMPLOYEE` | `MANAGER` | OWNER, MANAGER |
| `MANAGER` | `EMPLOYEE` | OWNER, MANAGER |

> **OWNER** role is assigned at firm registration and cannot be changed via the API.  
> **ADMIN** role is a platform-level role managed directly in the database.

---

## Role Assignment Lifecycle

```
New firm registered
        │
        ▼
  OWNER account created
        │
        ├─► OWNER sends invite (role: MANAGER or EMPLOYEE)
        │
        │   Invitee clicks email link
        │
        ▼
  POST /auth/accept-invite
        │
        ▼
  User created with assigned role
        │
        ├─► OWNER/MANAGER can later promote: EMPLOYEE → MANAGER
        └─► OWNER/MANAGER can later demote:  MANAGER → EMPLOYEE
```

---

## Security Implementation

Roles are enforced via **Spring Security** at the controller level using `@PreAuthorize` or `SecurityConfig` `HttpSecurity` rules. The authenticated principal carries the user's role as a `GrantedAuthority`.

The `SecurityContextHolder` stores the `AuthenticatedUserPrincipal` which includes:
- `userId` (Long)
- `username` (uppercased email)
- `firmId` (Long)
- `role` (as Spring `GrantedAuthority`)
