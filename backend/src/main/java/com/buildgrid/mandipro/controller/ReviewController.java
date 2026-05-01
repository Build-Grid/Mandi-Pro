package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.ReviewConstants;
import com.buildgrid.mandipro.dto.request.ReviewRequest;
import com.buildgrid.mandipro.dto.response.ReviewResponse;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.ReviewService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.REVIEW)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Review Management", description = "Endpoints for managing reviews and feedback.")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping(ApiPaths.REVIEW_POST)
    @Operation(summary = "Submit a review", description = "Allows users to submit reviews and feedback about their experience.")
    public ResponseEntity<ApiResponse<ReviewResponse>> postReview(@RequestBody ReviewRequest request) {
        log.info(LogMessages.OPERATION_STARTED,"api.review.create", TraceIdUtil.get());
        ReviewResponse response = reviewService.createReview(request);
        log.info(LogMessages.OPERATION_COMPLETED,"api.review.create", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Review submitted successfully", response));
    }

    @GetMapping(ApiPaths.REVIEW_FETCH_ALL)
    @Operation(summary = "Get all reviews", description = "Fetches all reviews and feedback submitted by users.")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getReviews() {
        log.info(LogMessages.OPERATION_STARTED,"api.review.get", TraceIdUtil.get());
        List<ReviewResponse> reviews = reviewService.getReviews();
        log.info(LogMessages.OPERATION_COMPLETED,"api.review.get", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Reviews fetched successfully", reviews));
    }

    @GetMapping(ApiPaths.REVIEW_FETCH_PUBLIC)
    @Operation(summary = "Get public reviews", description = "Fetches only approved reviews that are publicly visible.")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getPublicReviews() {
        log.info(LogMessages.OPERATION_STARTED,"api.review.getPublic", TraceIdUtil.get());
        List<ReviewResponse> reviews = reviewService.getReviews().stream()
                .filter(review -> review.getReviewStatus().equals(ReviewConstants.APPROVED))
                .toList();
        log.info(LogMessages.OPERATION_COMPLETED,"api.review.getPublic", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Public reviews fetched successfully", reviews));
    }

    @PatchMapping(ApiPaths.REVIEW_APPROVE_BY_ID)
    @Operation(summary = "Approve a review", description = "Allows admins to approve reviews before they are publicly visible.")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ReviewResponse>> approveReview(@PathVariable Long id){
        log.info(LogMessages.OPERATION_STARTED,"api.review.approve", TraceIdUtil.get());
        ReviewResponse response = reviewService.updateReview(id, ReviewConstants.APPROVED);
        log.info(LogMessages.OPERATION_COMPLETED,"api.review.approve", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Review approved successfully", response));
    }

    @PatchMapping(ApiPaths.REVIEW_REJECT_BY_ID)
    @Operation(summary = "Reject a review", description = "Allows admins to reject reviews that do not meet guidelines.")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ReviewResponse>> rejectReview(@PathVariable Long id){
        log.info(LogMessages.OPERATION_STARTED,"api.review.reject", TraceIdUtil.get());
        ReviewResponse response = reviewService.updateReview(id, ReviewConstants.REJECTED);
        log.info(LogMessages.OPERATION_COMPLETED,"api.review.reject", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Review rejected successfully", response));
    }
}
