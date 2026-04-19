-- Create units table
CREATE TABLE IF NOT EXISTS units
(
    unit_id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    unit_name         VARCHAR(255)   NOT NULL,
    unit_code         VARCHAR(255)   NOT NULL,
    unit_type         VARCHAR(255)   NOT NULL,
    base_unit_id      BIGINT,
    conversion_factor DECIMAL(15, 6) NOT NULL DEFAULT 1 COMMENT 'Multiplier to convert into base unit',
    created_at        TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP               DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by        VARCHAR(255),
    updated_by        VARCHAR(255),
    status            VARCHAR(20)    NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT uk_unit_unit_code UNIQUE (unit_code),
    CONSTRAINT fk_unit_base_unit_id
        FOREIGN KEY (base_unit_id) REFERENCES units (unit_id)
);

-- -----------------------------------------------------------------------
-- 1. BASE UNITS  (base_unit_id = NULL — these are the roots of each family)
-- -----------------------------------------------------------------------

INSERT INTO units (unit_name, unit_code, unit_type, base_unit_id, conversion_factor, created_by, updated_by, status)
VALUES
    -- Mass / Weight
    ('Kilogram', 'KG', 'MASS', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
    -- Volume (liquid)
    ('Litre', 'L', 'VOLUME', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
    -- Area
    ('Square Metre', 'SQM', 'AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
    -- Length
    ('Metre', 'M', 'LENGTH', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
    -- Count / Quantity
    ('Piece', 'PC', 'COUNT', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
    -- Temperature
    ('Celsius', 'CEL', 'TEMPERATURE', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
    -- Energy
    ('Kilowatt Hour', 'KWH', 'ENERGY', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
    -- Time
    ('Hour', 'HR', 'TIME', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
    -- Concentration / Rate
    ('Parts Per Million', 'PPM', 'CONCENTRATION', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE');


-- -----------------------------------------------------------------------
-- 2. MASS / WEIGHT  (base: KG)
-- -----------------------------------------------------------------------

INSERT INTO units (unit_name, unit_code, unit_type, base_unit_id, conversion_factor, created_by, updated_by, status)
VALUES ('Gram', 'G', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t), 0.001000,
        'SYSTEM', 'SYSTEM',
        'ACTIVE'),
       ('Milligram', 'MG', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t),
        0.000001, 'SYSTEM', 'SYSTEM',
        'ACTIVE'),
       ('Quintal', 'QTL', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t),
        100.000000, 'SYSTEM', 'SYSTEM',
        'ACTIVE'),
       ('Metric Tonne', 'MT', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t),
        1000.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Pound', 'LB', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t), 0.453592,
        'SYSTEM', 'SYSTEM',
        'ACTIVE'),
       ('Ounce', 'OZ', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t), 0.028350,
        'SYSTEM', 'SYSTEM',
        'ACTIVE'),
       ('Stone', 'ST', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t), 6.350293,
        'SYSTEM', 'SYSTEM',
        'ACTIVE'),
       ('Short Ton', 'STON', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t),
        907.184740, 'SYSTEM', 'SYSTEM',
        'ACTIVE'),
       ('Long Ton', 'LTON', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t),
        1016.046909, 'SYSTEM', 'SYSTEM',
        'ACTIVE'),
       ('Maund', 'MAUND', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t),
        37.324000, 'SYSTEM', 'SYSTEM',
        'ACTIVE'), -- South Asian
       ('Seer', 'SEER', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t), 0.933100,
        'SYSTEM', 'SYSTEM',
        'ACTIVE'), -- South Asian
       ('Tola', 'TOLA', 'MASS', (SELECT unit_id FROM (SELECT unit_id FROM units WHERE unit_code = 'KG') AS t), 0.011664,
        'SYSTEM', 'SYSTEM',
        'ACTIVE');
-- South Asian


-- -----------------------------------------------------------------------
-- 3. VOLUME  (base: L)
-- -----------------------------------------------------------------------

INSERT INTO units (unit_name, unit_code, unit_type, base_unit_id, conversion_factor, created_by, updated_by, status)
VALUES ('Millilitre', 'ML', 'VOLUME', (SELECT unit_id
                                       FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t), 0.001000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Cubic Metre', 'M3', 'VOLUME', (SELECT unit_id
                                        FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t), 1000.000000,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Kilolitre', 'KL', 'VOLUME', (SELECT unit_id
                                      FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t), 1000.000000,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Gallon (US)', 'GAL_US', 'VOLUME', (SELECT unit_id
                                            FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t), 3.785411,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Gallon (UK)', 'GAL_UK', 'VOLUME', (SELECT unit_id
                                            FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t), 4.546092,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Fluid Ounce (US)', 'FLOZ_US', 'VOLUME', (SELECT unit_id
                                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t),
        0.029574, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Pint (US)', 'PT_US', 'VOLUME', (SELECT unit_id
                                         FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t), 0.473176,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Quart (US)', 'QT_US', 'VOLUME', (SELECT unit_id
                                          FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t), 0.946353,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Barrel (Oil)', 'BBL', 'VOLUME', (SELECT unit_id
                                          FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t), 158.987295,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Bushel (US)', 'BU_US', 'VOLUME', (SELECT unit_id
                                           FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t), 35.239070,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Peck (US)', 'PK_US', 'VOLUME', (SELECT unit_id
                                         FROM (SELECT unit_id FROM units WHERE unit_code = 'L') AS t), 8.809768,
        'SYSTEM', 'SYSTEM', 'ACTIVE');


-- -----------------------------------------------------------------------
-- 4. AREA  (base: SQM)
-- -----------------------------------------------------------------------

INSERT INTO units (unit_name, unit_code, unit_type, base_unit_id, conversion_factor, created_by, updated_by, status)
VALUES ('Square Centimetre', 'SQCM', 'AREA', (SELECT unit_id
                                              FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 0.000100,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Square Kilometre', 'SQKM', 'AREA', (SELECT unit_id
                                             FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t),
        1000000.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Hectare', 'HA', 'AREA', (SELECT unit_id
                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 10000.000000,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Acre', 'AC', 'AREA', (SELECT unit_id
                               FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 4046.856422, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Bigha', 'BIGHA', 'AREA', (SELECT unit_id
                                   FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 1337.803776,
        'SYSTEM', 'SYSTEM', 'ACTIVE'), -- common Indian
       ('Kattha', 'KATTHA', 'AREA', (SELECT unit_id
                                     FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 66.890189,
        'SYSTEM', 'SYSTEM', 'ACTIVE'), -- Bihar/Bengal
       ('Marla', 'MARLA', 'AREA', (SELECT unit_id
                                   FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 25.292853, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),           -- South Asian
       ('Kanal', 'KANAL', 'AREA', (SELECT unit_id
                                   FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 505.857026, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),           -- South Asian
       ('Guntha', 'GUNTHA', 'AREA', (SELECT unit_id
                                     FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 101.171000,
        'SYSTEM', 'SYSTEM', 'ACTIVE'), -- South Asian
       ('Square Foot', 'SQFT', 'AREA', (SELECT unit_id
                                        FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 0.092903,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Square Yard', 'SQYD', 'AREA', (SELECT unit_id
                                        FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 0.836127,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Square Mile', 'SQMI', 'AREA', (SELECT unit_id
                                        FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 2589988.110336,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Rai', 'RAI', 'AREA', (SELECT unit_id
                               FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 1600.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),           -- Thailand/SE Asia
       ('Feddan', 'FEDDAN', 'AREA', (SELECT unit_id
                                     FROM (SELECT unit_id FROM units WHERE unit_code = 'SQM') AS t), 4200.833000,
        'SYSTEM', 'SYSTEM', 'ACTIVE');
-- Egypt / Middle East


-- -----------------------------------------------------------------------
-- 5. LENGTH  (base: M)
-- -----------------------------------------------------------------------

INSERT INTO units (unit_name, unit_code, unit_type, base_unit_id, conversion_factor, created_by, updated_by, status)
VALUES ('Centimetre', 'CM', 'LENGTH', (SELECT unit_id
                                       FROM (SELECT unit_id FROM units WHERE unit_code = 'M') AS t), 0.010000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Millimetre', 'MM', 'LENGTH', (SELECT unit_id
                                       FROM (SELECT unit_id FROM units WHERE unit_code = 'M') AS t), 0.001000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Kilometre', 'KM', 'LENGTH', (SELECT unit_id
                                      FROM (SELECT unit_id FROM units WHERE unit_code = 'M') AS t), 1000.000000,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Inch', 'IN', 'LENGTH', (SELECT unit_id
                                 FROM (SELECT unit_id FROM units WHERE unit_code = 'M') AS t), 0.025400, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Foot', 'FT', 'LENGTH', (SELECT unit_id
                                 FROM (SELECT unit_id FROM units WHERE unit_code = 'M') AS t), 0.304800, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Yard', 'YD', 'LENGTH', (SELECT unit_id
                                 FROM (SELECT unit_id FROM units WHERE unit_code = 'M') AS t), 0.914400, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Mile', 'MI', 'LENGTH', (SELECT unit_id
                                 FROM (SELECT unit_id FROM units WHERE unit_code = 'M') AS t), 1609.344000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Furlong', 'FUR', 'LENGTH', (SELECT unit_id
                                     FROM (SELECT unit_id FROM units WHERE unit_code = 'M') AS t), 201.168000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Chain', 'CH', 'LENGTH', (SELECT unit_id
                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'M') AS t), 20.116800, 'SYSTEM',
        'SYSTEM', 'ACTIVE');


-- -----------------------------------------------------------------------
-- 6. COUNT / PACKING  (base: PC)
-- -----------------------------------------------------------------------

INSERT INTO units (unit_name, unit_code, unit_type, base_unit_id, conversion_factor, created_by, updated_by, status)
VALUES ('Dozen', 'DZ', 'COUNT', (SELECT unit_id
                                 FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 12.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Gross', 'GR', 'COUNT', (SELECT unit_id
                                 FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 144.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Score', 'SCR', 'COUNT', (SELECT unit_id
                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 20.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Bundle', 'BDL', 'COUNT', (SELECT unit_id
                                   FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 1.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),           -- variable; placeholder
       ('Tray', 'TRAY', 'COUNT', (SELECT unit_id
                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 1.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Crate', 'CRATE', 'COUNT', (SELECT unit_id
                                    FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 1.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Bag', 'BAG', 'COUNT', (SELECT unit_id
                                FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 1.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Sack', 'SACK', 'COUNT', (SELECT unit_id
                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 1.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Pallet', 'PLT', 'COUNT', (SELECT unit_id
                                   FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 1.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Container (20 ft)', 'CONT_20', 'COUNT', (SELECT unit_id
                                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t),
        1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Container (40 ft)', 'CONT_40', 'COUNT', (SELECT unit_id
                                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t),
        1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Head', 'HD', 'COUNT', (SELECT unit_id
                                FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 1.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),           -- livestock
       ('Animal Unit', 'AU', 'COUNT', (SELECT unit_id
                                       FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 1.000000,
        'SYSTEM', 'SYSTEM', 'ACTIVE'), -- livestock standard
       ('Bird', 'BIRD', 'COUNT', (SELECT unit_id
                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 1.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),           -- poultry
       ('Egg', 'EGG', 'COUNT', (SELECT unit_id
                                FROM (SELECT unit_id FROM units WHERE unit_code = 'PC') AS t), 1.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE');


-- -----------------------------------------------------------------------
-- 7. TIME  (base: HR)
-- -----------------------------------------------------------------------

INSERT INTO units (unit_name, unit_code, unit_type, base_unit_id, conversion_factor, created_by, updated_by, status)
VALUES ('Minute', 'MIN', 'TIME', (SELECT unit_id
                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'HR') AS t), 0.016667, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Second', 'SEC', 'TIME', (SELECT unit_id
                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'HR') AS t), 0.000278, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Day', 'DAY', 'TIME', (SELECT unit_id
                               FROM (SELECT unit_id FROM units WHERE unit_code = 'HR') AS t), 24.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Week', 'WK', 'TIME', (SELECT unit_id
                               FROM (SELECT unit_id FROM units WHERE unit_code = 'HR') AS t), 168.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Month', 'MON', 'TIME', (SELECT unit_id
                                 FROM (SELECT unit_id FROM units WHERE unit_code = 'HR') AS t), 730.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),           -- avg
       ('Season', 'SEASON', 'TIME', (SELECT unit_id
                                     FROM (SELECT unit_id FROM units WHERE unit_code = 'HR') AS t), 2190.000000,
        'SYSTEM', 'SYSTEM', 'ACTIVE'), -- ~3 months
       ('Year', 'YR', 'TIME', (SELECT unit_id
                               FROM (SELECT unit_id FROM units WHERE unit_code = 'HR') AS t), 8760.000000, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Growing Season', 'GROW_S', 'TIME', (SELECT unit_id
                                             FROM (SELECT unit_id FROM units WHERE unit_code = 'HR') AS t), 2920.000000,
        'SYSTEM', 'SYSTEM', 'ACTIVE');
-- ~4 months avg


-- -----------------------------------------------------------------------
-- 8. ENERGY  (base: KWH)
-- -----------------------------------------------------------------------

INSERT INTO units (unit_name, unit_code, unit_type, base_unit_id, conversion_factor, created_by, updated_by, status)
VALUES ('Watt Hour', 'WH', 'ENERGY', (SELECT unit_id
                                      FROM (SELECT unit_id FROM units WHERE unit_code = 'KWH') AS t), 0.001000,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Megawatt Hour', 'MWH', 'ENERGY', (SELECT unit_id
                                           FROM (SELECT unit_id FROM units WHERE unit_code = 'KWH') AS t), 1000.000000,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Joule', 'J', 'ENERGY', (SELECT unit_id
                                 FROM (SELECT unit_id FROM units WHERE unit_code = 'KWH') AS t), 0.000000278, 'SYSTEM',
        'SYSTEM', 'ACTIVE'),
       ('Kilojoule', 'KJ', 'ENERGY', (SELECT unit_id
                                      FROM (SELECT unit_id FROM units WHERE unit_code = 'KWH') AS t), 0.000278,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Megajoule', 'MJ', 'ENERGY', (SELECT unit_id
                                      FROM (SELECT unit_id FROM units WHERE unit_code = 'KWH') AS t), 0.277778,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Calorie', 'CAL', 'ENERGY', (SELECT unit_id
                                     FROM (SELECT unit_id FROM units WHERE unit_code = 'KWH') AS t), 0.000001163,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Kilocalorie', 'KCAL', 'ENERGY', (SELECT unit_id
                                          FROM (SELECT unit_id FROM units WHERE unit_code = 'KWH') AS t), 0.001163,
        'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('British Thermal Unit', 'BTU', 'ENERGY', (SELECT unit_id
                                                  FROM (SELECT unit_id FROM units WHERE unit_code = 'KWH') AS t),
        0.000293, 'SYSTEM', 'SYSTEM', 'ACTIVE');


-- -----------------------------------------------------------------------
-- 9. CONCENTRATION / APPLICATION RATE  (base: PPM)
-- -----------------------------------------------------------------------

INSERT INTO units (unit_name, unit_code, unit_type, base_unit_id, conversion_factor, created_by, updated_by, status)
VALUES ('Parts Per Billion', 'PPB', 'CONCENTRATION', (SELECT unit_id
                                                      FROM (SELECT unit_id FROM units WHERE unit_code = 'PPM') AS t),
        0.001000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Percentage', 'PCT', 'CONCENTRATION', (SELECT unit_id
                                               FROM (SELECT unit_id FROM units WHERE unit_code = 'PPM') AS t),
        10000.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Milligram Per Litre', 'MG_L', 'CONCENTRATION', (SELECT unit_id
                                                         FROM (SELECT unit_id FROM units WHERE unit_code = 'PPM') AS t),
        1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'), -- ≈ PPM for water
       ('Gram Per Litre', 'G_L', 'CONCENTRATION', (SELECT unit_id
                                                   FROM (SELECT unit_id FROM units WHERE unit_code = 'PPM') AS t),
        1000.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Gram Per Kilogram', 'G_KG', 'CONCENTRATION', (SELECT unit_id
                                                       FROM (SELECT unit_id FROM units WHERE unit_code = 'PPM') AS t),
        1000.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Milligram Per Kg', 'MG_KG', 'CONCENTRATION', (SELECT unit_id
                                                       FROM (SELECT unit_id FROM units WHERE unit_code = 'PPM') AS t),
        1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE');
-- = PPM in soil/feed


-- -----------------------------------------------------------------------
-- 10. AGRICULTURE-SPECIFIC RATE UNITS  (stored as COUNT, no numeric conversion)
-- -----------------------------------------------------------------------

INSERT INTO units (unit_name, unit_code, unit_type, base_unit_id, conversion_factor, created_by, updated_by, status)
VALUES ('Kilogram Per Hectare', 'KG_HA', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Tonne Per Hectare', 'T_HA', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Kilogram Per Acre', 'KG_AC', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Litre Per Hectare', 'L_HA', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Litre Per Acre', 'L_AC', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Millilitre Per Litre', 'ML_L', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Kilogram Per Bigha', 'KG_BIGHA', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Bags Per Acre', 'BAG_AC', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Plants Per Hectare', 'PLT_HA', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Seeds Per Metre', 'SEED_M', 'RATE_LENGTH', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Heads Per Acre', 'HD_AC', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),       -- livestock stocking
       ('Animal Units Per Hectare', 'AU_HA', 'RATE_AREA', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Litre Per Animal', 'L_HD', 'RATE_COUNT', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Kilogram Per Animal', 'KG_HD', 'RATE_COUNT', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Egg Per Hen Per Day', 'EGG_HD_D', 'RATE_COUNT', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Litre Per Day', 'L_DAY', 'RATE_TIME', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),        -- irrigation / milk yield
       ('Kilogram Per Day', 'KG_DAY', 'RATE_TIME', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'),
       ('Cubic Metre Per Hour', 'M3_HR', 'RATE_TIME', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'), -- water flow
       ('Litre Per Second', 'L_SEC', 'RATE_TIME', NULL, 1.000000, 'SYSTEM', 'SYSTEM', 'ACTIVE'); -- irrigation flow