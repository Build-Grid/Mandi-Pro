# Custom native SQL queries for MandiPro
# Format: key=SQL (key is used as the query identifier at runtime)

deleteExpiredOrUsedPasswordResetTokensByUserId=DELETE FROM password_reset_tokens WHERE user_id = :userId AND (expires_at < :now OR used = TRUE)
