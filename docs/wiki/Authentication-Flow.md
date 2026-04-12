# 🔐 Authentication Flow

MandiPro uses **stateless JWT authentication** transported via HTTP-only cookies.

---

## Cookie Overview

| Cookie Name | Lifetime | Purpose |
|---|---|---|
| `ACCESS_TOKEN` | 15 min (configurable) | Sent on every API request for authentication |
| `REFRESH_TOKEN` | 7 days (configurable) | Used to silently obtain a new access token |

Both cookies are `HttpOnly` (no JavaScript access) and `Secure` in production with `SameSite=None`.

---

## Authentication Sequence

### 1. Registration

```
Client                          Backend
  │                                │
  │─── POST /api/v1/auth/register ─►│
  │    { firmName, email, password, │
  │      firstName, lastName }      │
  │                                │
  │    (Creates firm + owner user, │
  │     then auto-logs in)         │
  │                                │
  │◄── 201 Created ────────────────│
  │    Set-Cookie: ACCESS_TOKEN    │
  │    Set-Cookie: REFRESH_TOKEN   │
  │    Body: { accessToken,        │
  │            refreshToken, user }│
```

### 2. Login

```
Client                          Backend
  │                                │
  │─── POST /api/v1/auth/login ───►│
  │    { email, password }         │
  │                                │
  │◄── 200 OK ─────────────────────│
  │    Set-Cookie: ACCESS_TOKEN    │
  │    Set-Cookie: REFRESH_TOKEN   │
  │    Body: { accessToken,        │
  │            refreshToken, user }│
```

### 3. Authenticated Request

```
Client                          Backend
  │                                │
  │─── GET /api/v1/firm/users ────►│
  │    Cookie: ACCESS_TOKEN=<jwt>  │
  │                                │
  │    JwtAuthenticationFilter:    │
  │    1. Reads ACCESS_TOKEN cookie│
  │    2. Validates JWT signature  │
  │    3. Loads UserDetails        │
  │    4. Sets SecurityContext     │
  │                                │
  │◄── 200 OK ─────────────────────│
```

### 4. Token Refresh

When the access token expires, the frontend calls the refresh endpoint (no body needed — the refresh token cookie is sent automatically):

```
Client                          Backend
  │                                │
  │─── POST /api/v1/auth/refresh ─►│
  │    Cookie: REFRESH_TOKEN=<jwt> │
  │                                │
  │◄── 200 OK ─────────────────────│
  │    Set-Cookie: ACCESS_TOKEN    │ (new)
  │    Set-Cookie: REFRESH_TOKEN   │ (new)
```

### 5. Logout

```
Client                          Backend
  │                                │
  │─── POST /api/v1/auth/logout ──►│
  │    Cookie: REFRESH_TOKEN=<jwt> │
  │                                │
  │    Invalidates refresh token   │
  │    in DB, clears both cookies  │
  │                                │
  │◄── 200 OK ─────────────────────│
  │    Set-Cookie: ACCESS_TOKEN=;  │ (cleared)
  │    Set-Cookie: REFRESH_TOKEN=; │ (cleared)
```

---

## Password Reset Flow

```
1. POST /api/v1/auth/forgot-password  { email }
   → Backend creates PasswordResetToken (expires in 15 min)
   → Sends reset link email to user

2. User clicks link: <frontend>/reset-password?token=<uuid>

3. POST /api/v1/auth/reset-password  { token, newPassword, confirmPassword }
   → Backend validates token (not expired, not used)
   → Updates password, marks token as used
```

---

## Invite Acceptance Flow

New users can join an existing firm via email invitation:

```
1. OWNER/MANAGER sends invite via POST /api/v1/firm/invites
2. User receives email with a unique invite link
3. User previews invite: GET /api/v1/invites/preview?token=<token>
4. User accepts: POST /api/v1/auth/accept-invite { token, password, firstName, lastName }
   → Backend creates the user account linked to the firm
   → Returns the new user details (user must then login)
```

---

## JWT Token Structure

### Header
```json
{ "alg": "HS512", "typ": "JWT" }
```

### Payload (Access Token)
```json
{
  "sub": "USERNAME",
  "iat": 1700000000,
  "exp": 1700000900
}
```

> The `sub` claim holds the **uppercased username** (not the email).

---

## Security Filter Chain

```
Request
  │
  ├─► TraceIdFilter         (adds X-Trace-Id to MDC and response)
  │
  ├─► JwtAuthenticationFilter
  │     1. Reads ACCESS_TOKEN cookie (or Authorization: Bearer header)
  │     2. Validates JWT with JwtTokenProvider
  │     3. Loads UserDetails via CustomUserDetailsService
  │     4. Sets authentication in SecurityContextHolder
  │
  └─► Controller / Resource
```

---

## Token Configuration

Expiry values are set via environment variables:

```env
JWT_ACCESS_EXPIRY_MS=900000       # 15 minutes
JWT_REFRESH_EXPIRY_MS=604800000   # 7 days
```

> ⚠️ Always rotate `JWT_SECRET` between environments. Use a minimum 64-character random string for HMAC-SHA512.
