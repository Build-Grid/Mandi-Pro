package com.buildgrid.mandipro.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UnitResponse {
    private Long id;
    private String unitName;
    private String unitCode;
    private String unitType;
    private String baseUnitCode;
    private BigDecimal conversionFactor;
}
