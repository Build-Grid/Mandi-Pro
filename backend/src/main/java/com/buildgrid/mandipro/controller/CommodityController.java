package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.dto.request.CommodityRequest;
import com.buildgrid.mandipro.dto.response.CommodityResponse;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.CommodityService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.COMMODITY)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Commodity Controller", description = "APIs for managing commodities")
public class CommodityController {
    private final CommodityService commodityService;

    @Operation(summary = "Create a new commodity", description = "Creates a new commodity with the provided details. Accessible by OWNER and MANAGERS.")
    @PostMapping(ApiPaths.COMMODITY_CREATE)
    public ResponseEntity<ApiResponse<CommodityResponse>> createCommodity(@RequestBody CommodityRequest commodityRequest) {
        log.info(LogMessages.OPERATION_STARTED, "api.commodity.create", TraceIdUtil.get());
        CommodityResponse response = commodityService.createCommodity(commodityRequest);
        log.info(LogMessages.OPERATION_COMPLETED, "api.commodity.create", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Commodity created successfully", response));
    }

    @Operation(summary = "Update an existing commodity", description = "Updates an existing commodity with the provided details. Accessible by OWNER and MANAGERS.")
    @PatchMapping(ApiPaths.COMMODITY_UPDATE)
    public ResponseEntity<ApiResponse<CommodityResponse>> updateCommodity(@RequestBody CommodityRequest commodityRequest, @PathVariable Long id) {
        log.info(LogMessages.OPERATION_STARTED, "api.commodity.update", TraceIdUtil.get());
        CommodityResponse response = commodityService.updateCommodity(commodityRequest, id);
        log.info(LogMessages.OPERATION_COMPLETED, "api.commodity.update", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Commodity updated successfully", response));
    }

    @Operation(summary = "Delete a commodity", description = "Deletes a commodity by its ID. Accessible by OWNER and MANAGERS.")
    @DeleteMapping(ApiPaths.COMMODITY_DELETE)
    public ResponseEntity<ApiResponse<Void>> deleteCommodity(@PathVariable Long id) {
        log.info(LogMessages.OPERATION_STARTED, "api.commodity.delete", TraceIdUtil.get());
        commodityService.deleteCommodity(id);
        log.info(LogMessages.OPERATION_COMPLETED, "api.commodity.delete", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Commodity deleted successfully", null));
    }

    @Operation(summary = "Fetch a commodity by ID", description = "Fetches a commodity by its ID. Accessible by all users in the firm.")
    @GetMapping(ApiPaths.COMMODITY_FETCH)
    public ResponseEntity<ApiResponse<CommodityResponse>> fetchCommodityById(@PathVariable Long id) {
        log.info(LogMessages.OPERATION_STARTED, "api.commodity.fetchById", TraceIdUtil.get());
        CommodityResponse response = commodityService.fetchCommodityById(id);
        log.info(LogMessages.OPERATION_COMPLETED, "api.commodity.fetchById", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Commodity fetched successfully", response));
    }

    @Operation(summary = "Fetch all commodities", description = "Fetches a list of all commodities. Accessible by all users in the firm.")
    @GetMapping(ApiPaths.COMMODITY_FETCH_ALL)
    public ResponseEntity<ApiResponse<List<CommodityResponse>>> fetchAllCommodity() {
        log.info(LogMessages.OPERATION_STARTED, "api.commodity.fetchAll", TraceIdUtil.get());
        List<CommodityResponse> response = commodityService.fetchAllCommodities();
        log.info(LogMessages.OPERATION_COMPLETED, "api.commodity.fetchAll", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Commodities fetched successfully", response));
    }
}
