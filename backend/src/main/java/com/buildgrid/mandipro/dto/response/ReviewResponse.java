package com.buildgrid.mandipro.dto.response;

import com.buildgrid.mandipro.constants.ReviewConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private Long id;
    private String name;
    private String review;
    private BigDecimal rating;
    private ReviewConstants reviewStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
