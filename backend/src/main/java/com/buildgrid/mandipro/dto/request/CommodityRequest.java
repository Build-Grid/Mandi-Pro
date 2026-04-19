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
public class CommodityRequest {
    @NotEmpty(message = "Name is required")
    String name;
    String localName;
    String description;
    Long unitId;
    Long commodityTypeId;
}
