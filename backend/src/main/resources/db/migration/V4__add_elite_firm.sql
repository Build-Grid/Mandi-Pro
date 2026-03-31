-- Add a new column 'plan_type' to the 'firms' table to indicate the type of plan (e.g., STANDARD, ELITE)
ALTER TABLE firms
    ADD COLUMN plan_type VARCHAR(20) NOT NULL DEFAULT 'STANDARD' AFTER firm_name;