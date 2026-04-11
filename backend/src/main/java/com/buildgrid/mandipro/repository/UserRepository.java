package com.buildgrid.mandipro.repository;

import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    default Optional<User> findByEmail(String email){
        return findByEmailAndStatus(email,Status.ACTIVE);
    }
    Optional<User> findByEmailAndStatus(String email,Status status);

    default Optional<List<User>> findByFirm_Id(Long firmId){
        return findByFirm_IdAndStatus(firmId,Status.ACTIVE);
    }
    Optional<List<User>> findByFirm_IdAndStatus(Long firmId,Status status);

    default boolean existsByEmail(String email) {
        return existsByEmailAndStatus(email,Status.ACTIVE);
    }
    boolean existsByEmailAndStatus(String email, Status status);

    default boolean existsByUsernameAndFirm_Id(String username, Long firmId) {
        return existsByUsernameAndFirm_IdAndStatus(username, firmId, Status.ACTIVE);
    }
    boolean existsByUsernameAndFirm_IdAndStatus(String username, Long firmId, Status status);
}
