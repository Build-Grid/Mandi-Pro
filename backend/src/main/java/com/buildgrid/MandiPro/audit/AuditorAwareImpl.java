package com.buildgrid.mandipro.audit;

import com.buildgrid.mandipro.security.SecurityUtils;
import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    @NonNull
    public Optional<String> getCurrentAuditor() {
        return Optional.of(SecurityUtils.getCurrentUserEmail().orElse("SYSTEM"));
    }
}
