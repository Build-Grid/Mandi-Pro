package com.buildgrid.mandipro.repository;

import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {
    
    List<Party> findByFirm_IdAndStatusNot(Long firmId, Status status);
    
    Optional<Party> findByIdAndFirm_IdAndStatusNot(Long id, Long firmId, Status status);
}
