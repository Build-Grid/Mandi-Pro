package com.buildgrid.mandipro.dto.request;


import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotBlank(message = "Review text cannot be blank")
    private String review;

    @DecimalMax(value = "5.0", inclusive = true, message = "Rating must be at most 5.0")
    @DecimalMin(value = "0.0", inclusive = true, message = "Rating must be at least 0.0")
    private BigDecimal rating;
}
