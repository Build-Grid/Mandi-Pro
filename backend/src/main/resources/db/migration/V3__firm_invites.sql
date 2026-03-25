-- Create Firm Invites table
CREATE TABLE IF NOT EXISTS firm_invites (
    id CHAR(36) PRIMARY KEY,
    firm_id BIGINT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    invited_by_user_id BIGINT NOT NULL,
    token VARCHAR(255) UNIQUE,
    invite_status VARCHAR(20) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT uk_firm_invites_firm_username UNIQUE (firm_id, username),
    FOREIGN KEY (firm_id) REFERENCES firms(firm_id),
    FOREIGN KEY (invited_by_user_id) REFERENCES users(user_id)
);

