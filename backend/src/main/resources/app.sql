# Custom native SQL queries for MandiPro
# Format: key=SQL (key is used as the query identifier at runtime)

deleteExpiredOrUsedPasswordResetTokensByUserId=DELETE FROM password_reset_tokens WHERE user_id = :userId AND (expires_at < :now OR used = TRUE)
deleteFirmAndRelatedUsers=UPDATE firms f LEFT JOIN users u ON u.firm_id = f.firm_id AND u.status = 'ACTIVE' SET f.status = 'CANCEL', u.status = 'CANCEL' WHERE f.firm_id = :firmId
find_all_units_with_base_unit=SELECT u.unit_id AS id, u.unit_name AS unitName, u.unit_code AS unitCode, u.unit_type AS unitType, u.conversion_factor AS conversionFactor, b.unit_code AS baseUnitCode FROM units u LEFT JOIN units b ON u.base_unit_id = b.unit_id WHERE u.status = 'ACTIVE' ORDER BY u.unit_id