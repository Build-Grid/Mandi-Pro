package com.buildgrid.mandipro.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommodityTypeRequest {
    @NotEmpty(message = "Type name is required")
    private String typeName;

    private String description;
}
