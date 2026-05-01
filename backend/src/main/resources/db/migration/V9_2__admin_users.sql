-- INSERT Admins in user table
INSERT
IGNORE INTO users (
    username,
    first_name,
    last_name,
    email,
    password,
    firm_id,
    role_id,
    created_by,
    updated_by,
    status,
    created_at,
    updated_at
)
VALUES
('admin1', 'Admin', 'One', 'admin1@thebuildgrid.com', '$2a$10$hash1', NULL,
 (SELECT role_id FROM roles WHERE role_name = 'ADMIN'),
 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('admin2', 'Admin', 'Two', 'admin2@thebuildgrid.com', '$2a$10$hash2', NULL,
 (SELECT role_id FROM roles WHERE role_name = 'ADMIN'),
 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('admin3', 'Admin', 'Three', 'admin3@thebuildgrid.com', '$2a$10$hash3', NULL,
 (SELECT role_id FROM roles WHERE role_name = 'ADMIN'),
 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('admin4', 'Admin', 'Four', 'admin4@thebuildgrid.com', '$2a$10$hash4', NULL,
 (SELECT role_id FROM roles WHERE role_name = 'ADMIN'),
 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('admin5', 'Admin', 'Five', 'admin5@thebuildgrid.com', '$2a$10$hash5', NULL,
 (SELECT role_id FROM roles WHERE role_name = 'ADMIN'),
 'SYSTEM', 'SYSTEM', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);