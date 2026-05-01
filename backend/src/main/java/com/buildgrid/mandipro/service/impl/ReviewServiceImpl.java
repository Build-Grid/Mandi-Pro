package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.constants.ReviewConstants;
import com.buildgrid.mandipro.dto.mapper.ReviewMapper;
import com.buildgrid.mandipro.dto.request.ReviewRequest;
import com.buildgrid.mandipro.dto.response.ReviewResponse;
import com.buildgrid.mandipro.entity.ReviewEntity;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.ReviewRepository;
import com.buildgrid.mandipro.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.buildgrid.mandipro.constants.LogMessages.REVIEW_UPDATE_INFO;
import static com.buildgrid.mandipro.util.ValidationUtil.sanitizeTrimToNull;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviews() {
        List<ReviewEntity> reviews = reviewRepository.findAll();
        return reviewMapper.toReviewResponseList(reviews);
    }

    @Override
    @Transactional
    public ReviewResponse createReview(ReviewRequest reviewRequest) {
        sanitizeReviewRequest(reviewRequest);

        ReviewEntity reviewEntity = reviewMapper.toReviewEntity(reviewRequest);
        reviewEntity.setReviewStatus(ReviewConstants.PENDING);

        ReviewEntity savedReview = reviewRepository.save(reviewEntity);
        return reviewMapper.toReviewResponse(savedReview);
    }

    @Override
    @Transactional
    public ReviewResponse updateReview(Long reviewId, ReviewConstants reviewStatus) {
        ReviewEntity reviewEntity = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));
        log.info(REVIEW_UPDATE_INFO, reviewId, reviewStatus);
        reviewEntity.setReviewStatus(reviewStatus);
        ReviewEntity updatedReview = reviewRepository.save(reviewEntity);

        return reviewMapper.toReviewResponse(updatedReview);
    }

    private void sanitizeReviewRequest(ReviewRequest reviewRequest) {
        reviewRequest.setName(sanitizeTrimToNull(reviewRequest.getName()));
        reviewRequest.setReview(sanitizeTrimToNull(reviewRequest.getReview()));
    }
}
