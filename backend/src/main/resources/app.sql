# Custom native SQL queries for MandiPro
# Format: key=SQL (key is used as the query identifier at runtime)

deleteExpiredOrUsedPasswordResetTokensByUserId=DELETE FROM password_reset_tokens WHERE user_id = :userId AND (expires_at < :now OR used = TRUE)
deleteFirmAndRelatedUsers=UPDATE firms f LEFT JOIN users u ON u.firm_id = f.firm_id AND u.status = 'ACTIVE' SET f.status = 'CANCEL', u.status = 'CANCEL' WHERE f.firm_id = :firmId
