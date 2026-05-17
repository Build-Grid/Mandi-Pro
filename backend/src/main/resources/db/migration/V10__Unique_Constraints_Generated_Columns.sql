-- =========================
-- PARTIES TABLE
-- =========================

-- Add column for village
ALTER TABLE parties
    ADD COLUMN village VARCHAR(255) AFTER address;

-- Add column for description
ALTER TABLE parties
    ADD COLUMN description VARCHAR(255) AFTER village;

-- Add generated column for active party
ALTER TABLE parties
    ADD COLUMN active_party VARCHAR(255)
    GENERATED ALWAYS AS (
        CASE
            WHEN status = 'ACTIVE'
                THEN CONCAT(firm_id, '_', name, '_', contact_number)
        END
    ) STORED AFTER name;

-- Add new UNIQUE constraint
ALTER TABLE parties
    ADD CONSTRAINT uk_parties_active_party UNIQUE (active_party);

-- Index for efficient lookups
CREATE INDEX idx_parties_firm_id_name_contact_status ON parties(firm_id, name, contact_number, status);