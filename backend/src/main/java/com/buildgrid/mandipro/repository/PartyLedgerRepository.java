package com.buildgrid.mandipro.repository;

import com.buildgrid.mandipro.entity.PartyLedger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartyLedgerRepository extends JpaRepository<PartyLedger, Long> {
    
    List<PartyLedger> findByParty_IdAndFirm_Id(Long partyId, Long firmId);
}
