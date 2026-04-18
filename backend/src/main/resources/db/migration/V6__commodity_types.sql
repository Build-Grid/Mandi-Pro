-- Create commodity_types table
CREATE TABLE IF NOT EXISTS commodity_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    firm_id BIGINT NOT NULL,
    active_type_name VARCHAR(255) GENERATED ALWAYS AS (
        CASE
            WHEN status = 'ACTIVE'
                THEN CONCAT(firm_id, '_', type_name)
        END
    )STORED,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT uk_commodity_types_active_type_name UNIQUE (active_type_name),
    CONSTRAINT fk_commodity_types_firms
        FOREIGN KEY (firm_id) REFERENCES firms(firm_id),
    INDEX idx_commodity_types_firm_id_status (firm_id,type_name,status)
);