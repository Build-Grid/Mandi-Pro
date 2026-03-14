INSERT INTO roles (id, name, description, created_at, created_by)
VALUES
(gen_random_uuid(), 'ROLE_ADMIN', 'Administrator with full access', now(), 'SYSTEM'),
(gen_random_uuid(), 'ROLE_OWNER', 'Business owner with management access', now(), 'SYSTEM'),
(gen_random_uuid(), 'ROLE_WORKER', 'Standard worker with basic access', now(), 'SYSTEM')
ON CONFLICT (name) DO NOTHING;
