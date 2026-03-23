-- Native SQL queries used by Spring Data JPA (bound via META-INF/orm.xml)

-- PasswordResetToken.deleteExpiredOrUsedByUser_Id
DELETE FROM password_reset_tokens
WHERE user_id = :userId
  AND (expires_at < :now OR used = TRUE);
