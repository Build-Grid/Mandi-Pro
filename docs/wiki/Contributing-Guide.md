# 🤝 Contributing Guide

Thank you for contributing to MandiPro! Please follow this guide to keep the codebase clean and consistent.

---

## Before You Start

1. Check the [open issues](https://github.com/Build-Grid/Mandi-Pro/issues) to see if your idea is already tracked.
2. For significant changes, open an issue first to discuss the approach.
3. Read the [Architecture Overview](Architecture-Overview) to understand the system.

---

## Development Workflow

### 1. Fork & Clone

```bash
git clone https://github.com/<your-username>/Mandi-Pro.git
cd Mandi-Pro
```

### 2. Create a Feature Branch

Branch from `main`:

```bash
git checkout -b feat/your-feature-name
```

Branch naming convention:

| Prefix | Use case |
|---|---|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `refactor/` | Code improvement, no behavior change |
| `docs/` | Documentation update |
| `chore/` | Maintenance (deps, config, CI) |
| `test/` | Adding or fixing tests |

### 3. Make Your Changes

- Backend: see [Backend Setup — Adding a New Feature](Backend-Setup#adding-a-new-feature-backend-checklist)
- Frontend: see [Frontend Setup — Development Guidelines](Frontend-Setup#development-guidelines)

### 4. Commit Using Conventional Commits

```bash
git commit -m "feat(auth): add email verification on registration"
```

**Format:** `<type>(<scope>): <short description>`

| Type | Description |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Refactoring |
| `docs` | Documentation |
| `test` | Tests |
| `chore` | Maintenance |
| `style` | Formatting, no logic change |
| `perf` | Performance improvement |

**Scope examples:** `auth`, `firm`, `invite`, `frontend`, `db`, `security`, `ci`

### 5. Push & Open a Pull Request

```bash
git push origin feat/your-feature-name
```

Open a Pull Request against `main` on GitHub.

---

## Pull Request Rules

- ✅ Link the related issue in the PR description (`Closes #123`)
- ✅ Describe what changed and why
- ✅ Add tests if the change touches business logic
- ✅ Ensure all CI checks pass before requesting review
- ✅ Keep PRs small and focused — one feature/fix per PR
- ❌ Do not push directly to `main`
- ❌ Do not merge your own PR without review

---

## Code Standards

### Backend (Java)

- Follow existing package structure and layered architecture
- Use Lombok (`@RequiredArgsConstructor`, `@Slf4j`, `@Builder`, etc.)
- All controllers must include `@Operation` and `@Tag` Swagger annotations
- Log the start and completion of every API operation using `LogMessages` constants
- Use `ApiResponse.ok()` / `ApiResponse.of()` for all response envelopes
- Throw custom exceptions (`AppException`, `ResourceNotFoundException`, etc.)
- All new entities must extend `BaseEntity`
- New database tables must have a Flyway migration file

### Frontend (TypeScript / React)

- Use `app/api/httpClient.ts` for all HTTP calls — never create ad-hoc Axios instances
- Keep route components thin; put logic in Redux slices or service modules
- Use TypeScript types — avoid `any`
- Follow the existing folder structure under `app/`

---

## Commit Message Examples

```
feat(invite): add resend invite endpoint
fix(auth): handle expired refresh token gracefully
refactor(firm): extract firm validation to service layer
docs(wiki): add database schema page
test(auth): add integration test for login flow
chore(deps): upgrade Spring Boot to 3.4.2
```

---

## Reporting Bugs

Use the [bug report template](https://github.com/Build-Grid/Mandi-Pro/issues/new?template=bug_report.md) and include:
- Steps to reproduce
- Expected vs actual behavior
- Relevant logs or screenshots
- Environment details (OS, Java/Node version)

---

## Suggesting Features

Use the [feature request template](https://github.com/Build-Grid/Mandi-Pro/issues/new?template=feature_request.md) and describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives considered
