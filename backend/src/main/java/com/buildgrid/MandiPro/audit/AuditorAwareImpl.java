package com.buildgrid.mandipro.audit;

import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;
import org.springframework.util.StringUtils;

import java.util.Optional;

import static com.buildgrid.mandipro.constants.AppConstants.SYSTEM;

@RequiredArgsConstructor
public class AuditorAwareImpl implements AuditorAware<String> {

    private final UserRepository userRepository;

    @Override
    @NonNull
    public Optional<String> getCurrentAuditor() {
        String principal = SecurityUtils.getCurrentUserEmail().orElse(null);

        if (!StringUtils.hasText(principal) || "anonymousUser".equalsIgnoreCase(principal)) {
            return Optional.of(SYSTEM);
        }

        Optional<User> currentUser = userRepository.findByEmail(principal);
        if (currentUser.isPresent() && StringUtils.hasText(currentUser.get().getUsername())) {
            return Optional.of(currentUser.get().getUsername().toUpperCase());
        }

        return Optional.of(principal);
    }
}
