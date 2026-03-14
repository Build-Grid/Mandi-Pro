# 🚀 MandiPro Backend Framework

A production-ready Spring Boot framework designed for scalability and robustness. This project provides the essential infrastructure components including security, traceability, and database management, allowing you to focus purely on business logic.

---

## 🛠 Tech Stack

*   **Java 21**
*   **Spring Boot 3.4.1**
*   **PostgreSQL**
*   **Flyway** (Migration tool enabled in all environments)
*   **Spring Security 6** (Stateless JWT)
*   **MapStruct 1.6.3** & **Lombok**
*   **Springdoc OpenAPI 2.7.0**

---

## ⚙️ Setup Instructions

### 1. Environment Variables
Copy `.env.example` to `.env` and configure your local settings:
```bash
cp .env.example .env
```

### 2. Database Setup
Ensure PostgreSQL is running and create the database:
```sql
CREATE DATABASE mandipro;
```

### 3. JVM Configuration
For consistent timestamp handling, add the following to your IDE's VM Options:
```bash
-Duser.timezone=Asia/Kolkata
```

### 4. Build & Run
```bash
# Build the project
mvn clean install

# Run in Development mode (Flyway enabled)
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

---

## 🛤 API Endpoints

### 🟢 Health Check
*   **GET** `/api/v1/health`
*   Returns system status, version, and trace ID.

### 🔐 Authentication
*   **POST** `/api/v1/auth/register` - Create a new account.
*   **POST** `/api/v1/auth/login` - Get Access/Refresh tokens.

---

## 🏗 Development Workflow

### Adding a New Entity
1.  **Entity**: Create class in `entity/` extending `BaseEntity`.
2.  **Repository**: Create interface in `repository/`.
3.  **DTO**: Define request/response in `dto/`.
4.  **Mapper**: Add mapping in `UserMapper` or new mapper.
5.  **Migration**: Create a new SQL file in `src/main/resources/db/migration/` (e.g., `V4__create_new_table.sql`).

---

## 🔍 Observability
*   **Trace ID**: Every request returns `X-Trace-Id` in the header.
*   **Logging**: MDC logs include the `traceId` for easy debugging.
*   **Swagger**: `http://localhost:8080/swagger-ui/index.html`

---

## 📑 Document Control

| Version | Date | Change Points | Changed By | Branch Name |
| :--- | :--- | :--- | :--- | :--- |
| **1.0.0** | 2025-01-20 | Initial Framework Generation: Security, JWT, JPA, Postgres | Atharva Sugandhi | `backend/feature/framework` |
| **1.1.0** | 2025-01-20 | Enabled Flyway in all Envs, `@SuperBuilder` fixes, `ddl-auto=validate` | Atharva Sugandhi | `backend/feature/flyway` |
| **1.1.1** | 2025-01-20 | Updated User ROLES from multiple selection to single selection | Atharva Sugandhi | `backend/feature/flyway` |
