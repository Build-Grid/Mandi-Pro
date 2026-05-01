package com.buildgrid.mandipro.service;

import com.buildgrid.mandipro.constants.ReviewConstants;
import com.buildgrid.mandipro.dto.request.ReviewRequest;
import com.buildgrid.mandipro.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> getReviews();
    ReviewResponse createReview(ReviewRequest reviewRequest);
    ReviewResponse updateReview(Long reviewId, ReviewConstants reviewStatus);
}
