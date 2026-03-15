package com.buildgrid.mandipro.repository;

import com.buildgrid.mandipro.entity.Firm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FirmRepository extends JpaRepository<Firm, Integer> {
    Optional<Firm> findByName(String name);
}
