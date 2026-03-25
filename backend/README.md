# 🚀 MandiPro Backend Framework

A production-ready Spring Boot framework designed for scalability and robustness. This project provides the essential infrastructure components including security, traceability, and database management, allowing you to focus purely on business logic.

---

## 🛠 Tech Stack

- **Java 21** (LTS)
- **Spring Boot 3.4.1**
- **MySQL 8.0+**
- **Flyway 9.22.3** (Database migration tool)
- **Spring Security 6** (Stateless JWT)
- **MapStruct 1.6.3** & **Lombok 1.18.42**
- **Springdoc OpenAPI 2.7.0** (Swagger UI)
- **Hibernate 6.6.4** (ORM)

---

## ⚙️ Setup Instructions

### 1. Prerequisites

- **Java 21**: Ensure Java 21 is installed and in PATH
- **MySQL 8.0+**: Running locally
- **Maven 3.8+**: For building the project

### 2. Database Setup

MySQL database will be auto-created on startup. Ensure MySQL server is running:

#### Using MySQL Workbench

1. **Open MySQL Workbench**
2. **Connect to your local MySQL instance** (default: `localhost:3306`)
3. **Create database** if it doesn't exist manually in MySQL Workbench:
    ```sql
    CREATE DATABASE `mandipro-db`;
    ```
4. **Verify connection** by executing a test query

#### Default MySQL Connection

- **Host**: `localhost`
- **Port**: `3306`
- **Username**: `root`
- **Password**: `secret` (configure as needed)
- **Database**: `mandipro-db`

### 3. Environment Variables

Set environment variables as mentioned in `.env.example` before running the application:

### 4. Build & Run

```bash
# Build the project
mvn clean package -DskipTests

# Run the application
java -jar target/MandiPro-0.0.1-SNAPSHOT.jar
```

Or with Maven:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

The application will:

- ✅ Run Flyway migrations from `src/main/resources/db/migration/`
- ✅ Create all tables and seed initial data
- ✅ Start on port `8080`

---

## � Database Schema

### Current Migration (V1)

**File**: `src/main/resources/db/migration/V1__auth_db_schema.sql`

#### Tables:

1. **roles** - Role definitions (ADMIN, OWNER, MANAGER, EMPLOYEE)
2. **firms** - Organization/firm information
3. **users** - User accounts with roles and firm association
4. **refresh_tokens** - JWT refresh token storage

#### Audit Fields (All tables):

- `created_at` - Timestamp of creation
- `updated_at` - Auto-updated on modification
- `created_by` - User ID who created the record
- `updated_by` - User ID who last updated the record
- `status` - Record status (ACTIVE, INACTIVE, etc.)

---

## 🏗 Development Workflow

### Adding a New Entity

1.  **Entity**: Create class in `entity/` extending `BaseEntity`.
2.  **Repository**: Create interface in `repository/`.
3.  **DTO**: Define request/response in `dto/`.
4.  **Mapper**: Add mapping in `UserMapper` or create new mapper.
5.  **Migration**: Create a new MySQL migration file in `src/main/resources/db/migration/`
    - Example: `V2__create_products_table.sql`
    - Use MySQL syntax
    - Flyway will automatically execute in order

### Migration File Guidelines

- **Naming**: `V<number>__<description>.sql` (e.g., `V2__add_products_table.sql`)
- **Database**: MySQL 8.0+ compatible syntax only
- **Auto-timestamps**: Use `TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` for audit fields
- **IDs**: Use `INT AUTO_INCREMENT PRIMARY KEY`

### Example Migration

```sql
-- V2__create_products_table.sql
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    firm_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    FOREIGN KEY (firm_id) REFERENCES firms(firm_id)
);
```

---

## 🔍 Observability & Monitoring

### Trace ID

Every request returns a unique `X-Trace-Id` header for distributed tracing:

```
X-Trace-Id: a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### Logging

All logs include the `traceId` in the MDC (Mapped Diagnostic Context) for easy correlation:

```
[2026-03-18 23:11:19.433] [INFO ] [traceId=a1b2c3d4-e5f6-7890-abcd-ef1234567890] [main] c.buildgrid.mandipro.MandiProApplication
```

### Swagger UI

Access the interactive API documentation:

- **URL**: `http://localhost:8080/swagger-ui/index.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

### Health Check

- **Endpoint**: `GET /api/v1.0/health`

---
