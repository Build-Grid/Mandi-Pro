package com.buildgrid.mandipro.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommodityTypeUpdateRequest {
    @NotNull(message = "Commodity type ID is required")
    Long id;

    private String typeName;

    private String description;
}
