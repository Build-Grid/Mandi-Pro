package com.buildgrid.mandipro.repository;

import com.buildgrid.mandipro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<List<User>> findByFirm_Id(Long firmId);
    boolean existsByEmail(String email);
    boolean existsByUsernameAndFirm_Id(String username, Long firmId);
}
