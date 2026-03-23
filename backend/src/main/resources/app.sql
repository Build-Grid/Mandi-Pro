# Named JPQL queries for Spring Data JPA repositories
# Format: EntityName.methodName=JPQL query

PasswordResetToken.deleteExpiredOrUsedByUser_Id=DELETE FROM PasswordResetToken t WHERE t.user.id = :userId AND (t.expiresAt < :now OR t.used = true)
