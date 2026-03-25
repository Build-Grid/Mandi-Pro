package com.buildgrid.mandipro.audit;

import com.buildgrid.mandipro.security.SecurityUtils;
import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;
import org.springframework.util.StringUtils;

import java.util.Locale;
import java.util.Optional;

import static com.buildgrid.mandipro.constants.AppConstants.SYSTEM;

public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    @NonNull
    public Optional<String> getCurrentAuditor() {
        String username = SecurityUtils.getCurrentUsername().orElse(null);

        if (!StringUtils.hasText(username) || "anonymousUser".equalsIgnoreCase(username)) {
            return Optional.of(SYSTEM);
        }

        return Optional.of(username.toUpperCase(Locale.ROOT));
    }
}
