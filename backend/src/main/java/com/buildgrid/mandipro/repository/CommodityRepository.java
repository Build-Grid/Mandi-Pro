package com.buildgrid.mandipro.repository;

import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.entity.Commodity;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommodityRepository extends JpaRepository<Commodity, Long> {

    @Override
    default Optional<Commodity> findById(@NonNull Long id) {
        return findByIdAndStatus(id, Status.ACTIVE);
    }
    Optional<Commodity> findByIdAndStatus(@NonNull Long id, Status status);

    default Optional<List<Commodity>> findByFirm_Id(Long firmId) {
        return findByFirm_IdAndStatus(firmId, Status.ACTIVE);
    }
    Optional<List<Commodity>> findByFirm_IdAndStatus(Long firmId, Status status);
}

