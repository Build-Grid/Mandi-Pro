# MandiPro Backend Framework

A production-ready Spring Boot framework with infrastructure-ready components.

## Tech Stack
- Java 21
- Spring Boot 3.4.1 (Stable alternative to requested 4.0.3)
- Spring Security 6
- PostgreSQL
- JWT (jjwt 0.12.6)
- Flyway (Production only)
- Springdoc OpenAPI 2.7.0 (Stable alternative to 3.0.0)
- MapStruct & Lombok

## Setup Instructions

1.  **Environment Variables**:
    - Copy `.env.example` to `.env`.
    - Configure your PostgreSQL database credentials and JWT secret in `.env`.

2.  **Database**:
    - Ensure PostgreSQL is running.
    - Create a database named `mandipro`.

3.  **Build**:
    ```bash
    mvn clean install
    ```

4.  **Run Development**:
    ```bash
    mvn spring-boot:run -Dspring-boot.run.profiles=dev
    ```
    - In `dev` profile, Hibernate will manage the schema (`create-drop`).
    - Flyway is disabled.
    - Inside VM Options for application configuration add:

    ```bash
        -Duser.timezone=Asia/Kolkata
    ```

5.  **Run Production**:
    ```bash
    mvn spring-boot:run -Dspring-boot.run.profiles=prod
    ```
    - In `prod` profile, Flyway handles migrations.
    - Hibernate DDL is disabled.

## API Endpoints

### Health Check
```bash
curl -X GET http://localhost:8080/api/v1/health
```

### Registration
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@mandipro.com",
  "password": "Password123",
  "fullName": "System Admin",
  "roles": ["ROLE_ADMIN"]
}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@mandipro.com",
  "password": "Password123"
}'
```

## Adding a New Entity

1.  Create the entity in `com.buildgrid.mandipro.entity` extending `BaseEntity`.
2.  Create a Repository interface in `com.buildgrid.mandipro.repository`.
3.  Create DTOs in `com.buildgrid.mandipro.dto`.
4.  Add a mapping in `UserMapper` or create a new mapper.
5.  **Migration (Prod)**: Create a new SQL file in `src/main/resources/db/migration` (e.g., `V4__add_products_table.sql`).
    ```sql
    CREATE TABLE products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10,2),
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP,
        created_by VARCHAR(255),
        updated_by VARCHAR(255)
    );
    ```

## Swagger Documentation
Available at: `http://localhost:8080/swagger-ui/index.html` (when `SWAGGER_ENABLED=true`)
