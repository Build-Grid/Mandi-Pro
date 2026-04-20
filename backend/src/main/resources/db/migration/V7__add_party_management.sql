CREATE TABLE parties (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    firm_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    contact_number VARCHAR(20),
    address VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT fk_parties_firm FOREIGN KEY (firm_id) REFERENCES firms(firm_id)
);

CREATE TABLE party_ledger (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    party_id BIGINT NOT NULL,
    firm_id BIGINT NOT NULL,
    entry_date TIMESTAMP NOT NULL,
    direction VARCHAR(20) NOT NULL,
    amount DECIMAL(19, 2) NOT NULL,
    reference_type VARCHAR(50),
    reference_id BIGINT,
    running_balance DECIMAL(19, 2) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT fk_party_ledger_party FOREIGN KEY (party_id) REFERENCES parties(id),
    CONSTRAINT fk_party_ledger_firm FOREIGN KEY (firm_id) REFERENCES firms(firm_id)
);
