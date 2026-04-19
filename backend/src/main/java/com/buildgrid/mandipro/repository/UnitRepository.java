package com.buildgrid.mandipro.repository;

import com.buildgrid.mandipro.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UnitRepository extends JpaRepository<Unit, Long> {
    Optional<Unit> findByUnitName(String unitName);
    Optional<Unit> findByUnitCode(String unitCode);
}
