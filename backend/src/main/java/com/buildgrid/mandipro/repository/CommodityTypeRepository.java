package com.buildgrid.mandipro.repository;

import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.entity.CommodityType;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommodityTypeRepository extends JpaRepository<CommodityType, Long> {

    @Override
    default Optional<CommodityType> findById(@NonNull Long id){
        return findByIdAndStatus(id, Status.ACTIVE);
    }
    Optional<CommodityType> findByIdAndStatus(@NonNull Long id, Status status);

    default Optional<List<CommodityType>> findByFirm_Id(Long firmId){
        return findByFirm_IdAndStatus(firmId, Status.ACTIVE);
    }
    Optional<List<CommodityType>> findByFirm_IdAndStatus(Long firmId, Status status);


}
