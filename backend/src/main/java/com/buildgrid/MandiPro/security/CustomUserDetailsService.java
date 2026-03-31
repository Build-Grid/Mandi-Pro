package com.buildgrid.mandipro.security;

import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + email));

        return new AuthenticatedUserPrincipal(
                user.getEmail(),
                user.getUsername(),
                user.getPassword(),
                user.getStatus() == Status.ACTIVE && isFirmActive(user),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName()))
        );
    }

    private boolean isFirmActive(User user) {
        return user.getFirm() == null || user.getFirm().getStatus() == Status.ACTIVE;
    }
}
