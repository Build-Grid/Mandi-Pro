package com.buildgrid.mandipro.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UnitGroupByTypeResponse {
    public Map<String, List<UnitResponse>> unitsByType;
}
