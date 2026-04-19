package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.dto.response.UnitGroupByTypeResponse;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.UnitService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPaths.UNIT)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Units", description = "Endpoints for managing units of measurement")
public class UnitController {
    private final UnitService unitService;

    @Operation(summary = "Get all units grouped by type", description = "Fetches all units of measurement and groups them by their type (e.g., length, weight, volume).")
    @GetMapping(ApiPaths.UNIT_FETCH_ALL_GROUP_BY_TYPE)
    public ResponseEntity<ApiResponse<UnitGroupByTypeResponse>> getUnitsGroupByType() {
        log.info(LogMessages.OPERATION_STARTED, "api.unit.getUnitsGroupByType", TraceIdUtil.get());
        UnitGroupByTypeResponse unitGroupByTypeResponse = unitService.getUnitsGroupByType();
        log.info(LogMessages.OPERATION_COMPLETED, "api.unit.getUnitsGroupByType", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Units fetched and grouped by type successfully", unitGroupByTypeResponse));
    }
}
