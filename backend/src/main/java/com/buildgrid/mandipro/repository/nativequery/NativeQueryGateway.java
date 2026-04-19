package com.buildgrid.mandipro.repository.nativequery;

import com.buildgrid.mandipro.constants.QueryNames;
import com.buildgrid.mandipro.dto.response.UnitResponse;
import com.buildgrid.mandipro.util.AppSqlLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public List<UnitResponse> findAllUnitsWithBaseUnit() {
        // Executes and Maps the result with target class.
        // NOTE : [SQL and Result class must have same names(CASE-SENSITIVE)]
        return appSqlLoader.executeAndMap(
                QueryNames.FIND_ALL_UNITS_WITH_BASE_UNIT,
                Map.of(),
                UnitResponse.class
        );
    }
}

