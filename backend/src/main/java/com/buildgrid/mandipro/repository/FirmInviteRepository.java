package com.buildgrid.mandipro.repository;

import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.entity.FirmInvite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FirmInviteRepository extends JpaRepository<FirmInvite, UUID> {
    Optional<FirmInvite> findByToken(String token);

    List<FirmInvite> findByFirm_IdOrderByCreatedAtDesc(Long firmId);

    default Optional<FirmInvite> findByIdAndFirm_Id(UUID id, Long firmId){
        return findByIdAndFirm_IdAndStatus(id, firmId, Status.ACTIVE);
    }
    Optional<FirmInvite> findByIdAndFirm_IdAndStatus(UUID id, Long firmId, Status status);

    default boolean existsByEmail(String email){
        return existsByEmailAndStatus(email, Status.ACTIVE);
    }
    boolean existsByEmailAndStatus(String email, Status status);

    default boolean existsByUsernameAndFirm_Id(String username, Long firmId) {
        return existsByUsernameAndFirm_IdAndStatus(username, firmId, Status.ACTIVE);
    }
    boolean existsByUsernameAndFirm_IdAndStatus(String username, Long firmId, Status status);
}

