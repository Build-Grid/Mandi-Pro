-- Function to update updated_at timestamp on update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to set default audit fields on insert
CREATE OR REPLACE FUNCTION set_default_audit_fields()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.updated_by IS NULL THEN
        NEW.updated_by = NEW.created_by;
    END IF;
    IF NEW.updated_at IS NULL THEN
        NEW.updated_at = NEW.created_at;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create Roles table
CREATE TABLE IF NOT EXISTS roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    role_description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

-- Triggers for roles
DROP TRIGGER IF EXISTS update_roles_updated_at ON roles;
CREATE TRIGGER update_roles_updated_at
    BEFORE UPDATE ON roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_roles_defaults ON roles;
CREATE TRIGGER set_roles_defaults
    BEFORE INSERT ON roles
    FOR EACH ROW
    EXECUTE FUNCTION set_default_audit_fields();

-- Insert Roles (idempotent)
INSERT INTO roles (role_name, role_description, created_by, status, created_at, updated_at) VALUES
('ADMIN', 'Administrator role', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('OWNER', 'Owner role', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MANAGER', 'Manager role', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('EMPLOYEE', 'Employee role', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (role_name) DO NOTHING;

-- Create Firms table
CREATE TABLE IF NOT EXISTS firms (
    firm_id SERIAL PRIMARY KEY,
    firm_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

-- Triggers for firms
DROP TRIGGER IF EXISTS update_firms_updated_at ON firms;
CREATE TRIGGER update_firms_updated_at
    BEFORE UPDATE ON firms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_firms_defaults ON firms;
CREATE TRIGGER set_firms_defaults
    BEFORE INSERT ON firms
    FOR EACH ROW
    EXECUTE FUNCTION set_default_audit_fields();

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    user_firstname VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    firm_id INT,
    role_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    FOREIGN KEY (firm_id) REFERENCES firms(firm_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Triggers for users
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_users_defaults ON users;
CREATE TRIGGER set_users_defaults
    BEFORE INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_default_audit_fields();

-- Create Refresh Tokens table
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    user_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Triggers for refresh_tokens
DROP TRIGGER IF EXISTS update_refresh_tokens_updated_at ON refresh_tokens;
CREATE TRIGGER update_refresh_tokens_updated_at
    BEFORE UPDATE ON refresh_tokens
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_refresh_tokens_defaults ON refresh_tokens;
CREATE TRIGGER set_refresh_tokens_defaults
    BEFORE INSERT ON refresh_tokens
    FOR EACH ROW
    EXECUTE FUNCTION set_default_audit_fields();
