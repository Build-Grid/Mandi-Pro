# 📨 Firm Invitations

The invitation system allows OWNER and MANAGER roles to bring new users into their firm without requiring self-registration.

---

## Overview

```
OWNER/MANAGER                  Backend                     Invitee
      │                           │                           │
      │── POST /firm/invites ─────►│                           │
      │   { email, username, role }│                           │
      │                           │ Creates FirmInvite record │
      │                           │ (status: PENDING)         │
      │                           │                           │
      │◄── 201 FirmInviteResponse ─│                           │
      │                           │── Email with invite link ─►│
      │                           │                           │
      │                           │        Invitee clicks link │
      │                           │◄── GET /invites/preview ───│
      │                           │    ?token=<token>          │
      │                           │── InvitePreviewResponse ──►│
      │                           │                           │
      │                           │◄── POST /auth/accept-invite│
      │                           │    { token, password,      │
      │                           │      firstName, lastName } │
      │                           │                           │
      │                           │ Creates user account       │
      │                           │ Marks invite ACCEPTED      │
      │                           │── 201 UserResponse ───────►│
```

---

## Invite Lifecycle States

| Status | Description |
|---|---|
| `PENDING` | Invite created, email sent, awaiting acceptance |
| `ACCEPTED` | Invitee completed registration |
| `CANCELLED` | Manually cancelled by OWNER/MANAGER |
| `EXPIRED` | Invite token passed its `expires_at` timestamp |

---

## API Endpoints

### Send an Invite

**`POST /api/v1/firm/invites`** — Roles: OWNER, MANAGER

```json
{
  "email": "newuser@example.com",
  "username": "NEWUSER@EXAMPLE.COM",
  "role": "EMPLOYEE"
}
```

Valid `role` values: `MANAGER`, `EMPLOYEE`

**Response `201`:**
```json
{
  "status": 201,
  "message": "Invitation sent successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "firmId": 1,
    "email": "newuser@example.com",
    "username": "NEWUSER@EXAMPLE.COM",
    "role": "EMPLOYEE",
    "inviteStatus": "PENDING",
    "expiresAt": "2026-04-15T14:00:00"
  }
}
```

---

### List All Invites

**`GET /api/v1/firm/invites`** — Roles: OWNER, MANAGER

Returns all invites for the authenticated user's firm.

---

### Cancel an Invite

**`DELETE /api/v1/firm/invites/{inviteId}`** — Roles: OWNER, MANAGER

Sets invite status to `CANCELLED`. The invite token becomes invalid.

---

### Resend an Invite

**`POST /api/v1/firm/invites/{inviteId}/resend`** — Roles: OWNER, MANAGER

Generates a new token and resends the email. The old token is invalidated.

---

### Preview an Invite (Public)

**`GET /api/v1/invites/preview?token=<token>`** — No auth required

Used by the frontend to display invite details before the user fills in their password.

**Response `200`:**
```json
{
  "status": 200,
  "message": "Invite details fetched",
  "data": {
    "firmName": "My Firm",
    "email": "newuser@example.com",
    "role": "EMPLOYEE",
    "expiresAt": "2026-04-15T14:00:00"
  }
}
```

---

### Accept an Invite

**`POST /api/v1/auth/accept-invite`** — No auth required

```json
{
  "token": "<invite-token>",
  "password": "securepassword",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

On success, a new user account is created and the invite is marked `ACCEPTED`.

---

## Notes

- An email address can only have one `PENDING` invite per firm at a time.
- Invite tokens expire — check `expires_at` before displaying an accept form.
- After accepting, the user must login separately via `POST /auth/login`.
