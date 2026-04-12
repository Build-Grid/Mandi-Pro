-- =========================
-- USERS TABLE
-- =========================

-- Add generated column for active email
ALTER TABLE users
    ADD COLUMN active_email VARCHAR(255)
    GENERATED ALWAYS AS (
        CASE WHEN status = 'ACTIVE' THEN email END
    ) STORED AFTER email;

-- Add generated column for firm + username
ALTER TABLE users
    ADD COLUMN active_firm_username VARCHAR(300)
    GENERATED ALWAYS AS (
        CASE
            WHEN status = 'ACTIVE'
                THEN CONCAT(firm_id, '_', username)
        END
    ) STORED AFTER active_email;

ALTER TABLE users
    ADD CONSTRAINT uk_users_active_email UNIQUE (active_email);

ALTER TABLE users
    ADD CONSTRAINT uk_users_active_firm_username UNIQUE (active_firm_username);

CREATE INDEX idx_users_email_status ON users(email, status);
CREATE INDEX idx_users_firm_id_username_status ON users(firm_id, username, status);


-- =========================
-- FIRM_INVITES TABLE
-- =========================

-- Add generated column for active email
ALTER TABLE firm_invites
    ADD COLUMN active_email VARCHAR(255)
    GENERATED ALWAYS AS (
        CASE WHEN status = 'ACTIVE' THEN email END
    ) STORED AFTER email;

-- Add generated column for firm + username
ALTER TABLE firm_invites
    ADD COLUMN active_firm_username VARCHAR(300)
    GENERATED ALWAYS AS (
        CASE
            WHEN status = 'ACTIVE'
                THEN CONCAT(firm_id, '_', username)
        END
    ) STORED AFTER active_email;

-- Add new UNIQUE constraints
ALTER TABLE firm_invites
    ADD CONSTRAINT uk_firm_invites_active_email UNIQUE (active_email);

ALTER TABLE firm_invites
    ADD CONSTRAINT uk_firm_invites_active_firm_username UNIQUE (active_firm_username);

-- Add supporting index
CREATE INDEX idx_firm_invites_email_status ON firm_invites(email, status);
CREATE INDEX idx_firm_invites_firm_id_username_status ON firm_invites(firm_id, username, status);