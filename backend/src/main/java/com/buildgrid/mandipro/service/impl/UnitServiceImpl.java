package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.dto.response.UnitGroupByTypeResponse;
import com.buildgrid.mandipro.dto.response.UnitResponse;
import com.buildgrid.mandipro.repository.nativequery.NativeQueryGateway;
import com.buildgrid.mandipro.service.UnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UnitServiceImpl implements UnitService {
    private final NativeQueryGateway nativeQueryGateway;

    @Override
    @Cacheable("units-grouped")
    public UnitGroupByTypeResponse getUnitsGroupByType() {
        List<UnitResponse> units = nativeQueryGateway.findAllUnitsWithBaseUnit();

        Map<String, List<UnitResponse>> groupedMap = units.stream()
                .collect(Collectors.groupingBy(
                        UnitResponse::getUnitType)
                );

        return UnitGroupByTypeResponse.builder()
                .unitsByType(groupedMap)
                .build();
    }
}
