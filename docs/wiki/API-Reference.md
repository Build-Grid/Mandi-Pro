# 📡 API Reference

All API endpoints. Base path: `/api/v1`

Swagger UI (dev): `http://localhost:8080/swagger-ui/index.html`

---

## Authentication — `/api/v1/auth`

| Method | Path | Auth Required | Description |
|--------|------|:---:|---|
| `POST` | `/auth/login` | ❌ | Authenticate user, receive tokens in cookies |
| `POST` | `/auth/register` | ❌ | Register new firm + owner, auto-login |
| `POST` | `/auth/refresh` | ❌ (cookie) | Refresh access token using refresh token cookie |
| `POST` | `/auth/logout` | ✅ | Invalidate refresh token, clear cookies |
| `POST` | `/auth/forgot-password` | ❌ | Send password reset email |
| `POST` | `/auth/reset-password` | ❌ | Reset password with token |
| `POST` | `/auth/accept-invite` | ❌ | Accept firm invitation, create account |
| `PUT` | `/auth/me/profile` | ✅ | Update current user first/last name |
| `PUT` | `/auth/me/change-password` | ✅ | Change current user password |

### POST `/auth/login`
**Request:**
```json
{ "email": "owner@firm.com", "password": "yourpassword" }
```
**Response `200`:**
```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "accessToken": "<jwt>",
    "refreshToken": "<jwt>",
    "user": { "userId": 1, "username": "OWNER@FIRM.COM", "email": "owner@firm.com", "firstName": "John", "lastName": "Doe", "role": "OWNER", "firmId": 1 }
  }
}
```
Cookies set: `ACCESS_TOKEN`, `REFRESH_TOKEN`

### POST `/auth/register`
**Request:**
```json
{
  "firmName": "My Firm",
  "email": "owner@firm.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```
**Response `201`:** Same structure as login.

### POST `/auth/forgot-password`
**Request:**
```json
{ "email": "owner@firm.com" }
```
**Response `200`:** Always succeeds (prevents email enumeration).

### POST `/auth/reset-password`
**Request:**
```json
{ "token": "<reset-token>", "newPassword": "newpass", "confirmPassword": "newpass" }
```

### POST `/auth/accept-invite`
**Request:**
```json
{ "token": "<invite-token>", "password": "pass", "firstName": "Jane", "lastName": "Smith" }
```
**Response `201`:** Returns new `UserResponse`.

---

## Health — `/api/v1/health`

| Method | Path | Auth Required | Description |
|--------|------|:---:|---|
| `GET` | `/health` | ❌ | Application health check |

**Response `200`:**
```json
{ "status": 200, "message": "OK", "data": null }
```

---

## Firm Management — `/api/v1/firm`

> Requires roles: **OWNER** or **MANAGER** (unless noted).

| Method | Path | Auth | Description |
|--------|------|:---:|---|
| `GET` | `/firm/users` | OWNER / MANAGER | List all users in the firm |
| `GET` | `/firm/user/{userId}` | OWNER / MANAGER | Get details of a specific user |
| `DELETE` | `/firm/user/{userId}/delete` | OWNER / MANAGER | Remove user from firm |
| `PUT` | `/firm/profile` | OWNER only | Update firm name |
| `PUT` | `/firm/user/{userId}/role` | OWNER / MANAGER | Promote/demote user role |
| `DELETE` | `/firm/delete` | OWNER only | Deactivate (cancel) the firm |

### GET `/firm/users` — Response `200`
```json
{
  "status": 200,
  "message": "Users fetched successfully",
  "data": [
    { "userId": 2, "username": "JANE@FIRM.COM", "email": "jane@firm.com", "firstName": "Jane", "lastName": "Smith", "role": "MANAGER", "firmId": 1 }
  ]
}
```

### PUT `/firm/user/{userId}/role`
**Request:**
```json
{ "role": "MANAGER" }
```
Valid role values: `MANAGER`, `EMPLOYEE`

### PUT `/firm/profile`
**Request:**
```json
{ "firmName": "New Firm Name" }
```

---

## Firm Invitations — `/api/v1/firm/invites`

> Requires roles: **OWNER** or **MANAGER**.

| Method | Path | Auth | Description |
|--------|------|:---:|---|
| `POST` | `/firm/invites` | OWNER / MANAGER | Send invitation email |
| `GET` | `/firm/invites` | OWNER / MANAGER | List all invites for the firm |
| `DELETE` | `/firm/invites/{inviteId}` | OWNER / MANAGER | Cancel a pending invite |
| `POST` | `/firm/invites/{inviteId}/resend` | OWNER / MANAGER | Resend invite email (refreshes token) |

### POST `/firm/invites`
**Request:**
```json
{ "email": "newuser@example.com", "username": "NEWUSER@EXAMPLE.COM", "role": "EMPLOYEE" }
```
**Response `201`:** Returns `FirmInviteResponse`.

---

## Invites (Public) — `/api/v1/invites`

| Method | Path | Auth | Description |
|--------|------|:---:|---|
| `GET` | `/invites/preview?token=<token>` | ❌ | Preview invite details before accepting |

---

## Standard API Response Envelope

All responses are wrapped in:

```json
{
  "status": 200,
  "message": "Human-readable message",
  "data": { /* payload or null */ }
}
```

### Error Response

```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "must be a valid email address" }
  ],
  "traceId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

### HTTP Status Codes Used

| Code | Meaning |
|---|---|
| `200` | Success |
| `201` | Resource created |
| `400` | Bad request / validation error |
| `401` | Unauthorized (no/invalid token) |
| `403` | Forbidden (insufficient role) |
| `404` | Resource not found |
| `500` | Internal server error |
