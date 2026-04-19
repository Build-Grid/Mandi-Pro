-- Create commodities table
CREATE TABLE IF NOT EXISTS commodities
(
    id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
    commodity_name        VARCHAR(255) NOT NULL,
    local_name            VARCHAR(255),
    description           VARCHAR(255),
    unit_id               BIGINT       NOT NULL,
    commodity_type_id     BIGINT       NOT NULL,
    firm_id               BIGINT       NOT NULL,
    active_commodity_name VARCHAR(255) GENERATED ALWAYS AS (
        CASE
            WHEN status = 'ACTIVE'
                THEN CONCAT(firm_id, '_', commodity_name)
            END
        ) STORED,
    created_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at            TIMESTAMP             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by            VARCHAR(255),
    updated_by            VARCHAR(255),
    status                VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT uk_commodity_active_commodity_name UNIQUE (active_commodity_name),
    CONSTRAINT fk_commodity_firms
        FOREIGN KEY (firm_id) REFERENCES firms (firm_id),
    CONSTRAINT fk_commodity_commodity_types
        FOREIGN KEY (commodity_type_id) REFERENCES commodity_types (id),
    CONSTRAINT fk_commodity_units
        FOREIGN KEY (unit_id) REFERENCES units (unit_id),
    INDEX idx_commodity_types_firm_id_status (firm_id, commodity_name, status)
);