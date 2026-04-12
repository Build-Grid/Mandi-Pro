# 🚀 Getting Started

This guide will have **both the backend and frontend running locally** in under 10 minutes.

---

## Prerequisites

| Tool | Minimum Version | Check |
|---|---|---|
| Java JDK | 21 | `java -version` |
| Maven | 3.8+ | `mvn -version` |
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| MySQL | 8.0+ | `mysql --version` |

---

## 1 — Clone the Repository

```bash
git clone https://github.com/Build-Grid/Mandi-Pro.git
cd Mandi-Pro
```

---

## 2 — Start the Backend

### 2a. Create the database

Connect to your local MySQL instance and run:

```sql
CREATE DATABASE IF NOT EXISTS `mandipro-db`;
```

### 2b. Configure environment

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your local values (at minimum, set `DB_USERNAME` and `DB_PASSWORD`):

```env
DB_URL=jdbc:mysql://localhost:3306/mandipro-db
DB_USERNAME=root
DB_PASSWORD=your_password
JWT_SECRET=any-64-character-string-for-local-dev-use-only
JWT_ACCESS_EXPIRY_MS=900000
JWT_REFRESH_EXPIRY_MS=604800000
ALLOWED_ORIGINS=http://localhost:5173
```

### 2c. Run with dev profile

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

The backend starts at **`http://localhost:8080`**.  
Flyway automatically applies all pending migrations.

Verify with:

```bash
curl http://localhost:8080/api/v1/health
```

---

## 3 — Start the Frontend

### 3a. Configure environment

```bash
cp frontend/.env.example frontend/.env.development
```

The default `.env.development` points to `http://localhost:8080/api/v1` — no changes needed for local dev.

### 3b. Install and run

```bash
cd frontend
npm install
npm run dev
```

The frontend starts at **`http://localhost:5173`**.

---

## 4 — Explore

| URL | Description |
|---|---|
| `http://localhost:5173/landing` | Public landing page |
| `http://localhost:5173/auth/login` | Login page |
| `http://localhost:5173/auth/register` | Register new firm + owner |
| `http://localhost:8080/swagger-ui/index.html` | Interactive API docs (Swagger) |
| `http://localhost:8080/api/v1/health` | Backend health check |

---

## Common Issues

| Problem | Solution |
|---|---|
| `Connection refused` on MySQL | Ensure MySQL service is running: `sudo systemctl start mysql` |
| `Port 8080 already in use` | Kill the process: `lsof -i :8080` then `kill <PID>` |
| `Port 5173 already in use` | Kill the process: `lsof -i :5173` then `kill <PID>` |
| Flyway migration error | Check MySQL version (8.0+ required) and that `mandipro-db` database exists |
| CORS error in browser | Verify `ALLOWED_ORIGINS` in `backend/.env` includes `http://localhost:5173` |

---

> 📌 For detailed backend or frontend configuration options, see [Backend Setup](Backend-Setup) and [Frontend Setup](Frontend-Setup).
