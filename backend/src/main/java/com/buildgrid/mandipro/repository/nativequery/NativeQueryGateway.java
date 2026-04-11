package com.buildgrid.mandipro.repository.nativequery;

import com.buildgrid.mandipro.constants.QueryNames;
import com.buildgrid.mandipro.util.AppSqlLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class NativeQueryGateway {

    private final AppSqlLoader appSqlLoader;

    public int cancelFirmAndRelatedUsers(Long firmId) {
        return appSqlLoader.createNativeQuery(
                QueryNames.DELETE_FIRM_AND_RELATED_USERS,
                Map.of("firmId", firmId)
        ).executeUpdate();
    }

    public int deleteExpiredOrUsedPasswordResetTokensByUserId(Long userId, LocalDateTime now) {
        return appSqlLoader.createNativeQuery(
                QueryNames.DELETE_EXPIRED_OR_USED_PASSWORD_RESET_TOKENS_BY_USER_ID,
                Map.of("userId", userId, "now", now)
        ).executeUpdate();
    }
}

