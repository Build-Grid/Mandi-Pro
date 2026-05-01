package com.buildgrid.mandipro.repository;

import com.buildgrid.mandipro.constants.ReviewConstants;
import com.buildgrid.mandipro.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    Optional<List<ReviewEntity>> findByReviewStatus(ReviewConstants reviewStatus);
    List<ReviewEntity> findAllByReviewStatus(ReviewConstants reviewStatus);

}

