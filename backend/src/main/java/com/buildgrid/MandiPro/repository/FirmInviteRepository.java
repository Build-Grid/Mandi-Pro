package com.buildgrid.mandipro.repository;

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

    Optional<FirmInvite> findByIdAndFirm_Id(UUID id, Long firmId);

    boolean existsByEmail(String email);

    boolean existsByUsernameAndFirm_Id(String username, Long firmId);
}

