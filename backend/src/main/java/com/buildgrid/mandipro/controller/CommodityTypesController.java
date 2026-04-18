package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.dto.request.CommodityTypeRequest;
import com.buildgrid.mandipro.dto.request.CommodityTypeUpdateRequest;
import com.buildgrid.mandipro.dto.response.CommodityTypeResponse;
import com.buildgrid.mandipro.entity.CommodityType;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.CommodityTypeService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.COMMODITY_TYPE)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Commodity Type Management", description = "Endpoints for managing commodity types. Accessible by managers and owners.")
public class CommodityTypesController {
    private final CommodityTypeService commodityTypeService;

    @Operation(summary = "Create a new commodity type", description = "Creates a new commodity type. Accessible by managers and owners.")
    @PostMapping(ApiPaths.COMMODITY_TYPE_CREATE)
    public ResponseEntity<ApiResponse<CommodityTypeResponse>> createCommodityType(@Valid @RequestBody CommodityTypeRequest request){
        log.info(LogMessages.OPERATION_STARTED,"api.commodity_type.create", TraceIdUtil.get());
        CommodityTypeResponse response = commodityTypeService.createCommodityType(request);
        log.info(LogMessages.OPERATION_COMPLETED,"api.commodity_type.create", TraceIdUtil.get());
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.of(HttpStatus.CREATED, "Commodity type created successfully", response));
    }

    @Operation(summary = "Update an existing commodity type", description = "Updates an existing commodity type. Accessible by managers and owners.")
    @PatchMapping(ApiPaths.COMMODITY_TYPE_UPDATE)
    public ResponseEntity<ApiResponse<CommodityTypeResponse>> updateCommodityType(@Valid @RequestBody CommodityTypeUpdateRequest request){
        log.info(LogMessages.OPERATION_STARTED,"api.commodity_type.update", TraceIdUtil.get());
        CommodityTypeResponse response = commodityTypeService.updateCommodityType(request);
        log.info(LogMessages.OPERATION_COMPLETED,"api.commodity_type.update", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK, "Commodity type updated successfully", response));
    }

    @Operation(summary = "Delete a commodity type", description = "Deletes a commodity type by ID. Accessible by managers and owners.")
    @DeleteMapping(ApiPaths.COMMODITY_TYPE_DELETE)
    public ResponseEntity<ApiResponse<CommodityTypeResponse>> deleteCommodityType(@PathVariable Long id){
        log.info(LogMessages.OPERATION_STARTED,"api.commodity_type", TraceIdUtil.get());
        commodityTypeService.deleteCommodityType(id);
        log.info(LogMessages.OPERATION_COMPLETED,"api.commodity_type", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.of(HttpStatus.OK, "Commodity type deleted successfully", null));
    }

    @Operation(summary = "Fetch a commodity type by ID", description = "Fetches a commodity type by its ID.")
    @GetMapping(ApiPaths.COMMODITY_TYPE_FETCH)
    public ResponseEntity<ApiResponse<CommodityTypeResponse>> fetchCommodityTypeById(@PathVariable Long id){
        log.info(LogMessages.OPERATION_STARTED,"api.commodity_type", TraceIdUtil.get());
        CommodityTypeResponse response = commodityTypeService.getCommodityTypeById(id);
        log.info(LogMessages.OPERATION_COMPLETED,"api.commodity_type", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Commodity type fetched successfully",response));
    }

    @Operation(summary = "Fetch all commodity types", description = "Fetches all commodity types for the firm.")
    @GetMapping(ApiPaths.COMMODITY_TYPE_FETCH_ALL)
    public ResponseEntity<ApiResponse<List<CommodityTypeResponse>>> fetchAllCommodityTypes(){
        log.info(LogMessages.OPERATION_STARTED,"api.commodity_type", TraceIdUtil.get());
        List<CommodityTypeResponse> commodityTypes = commodityTypeService.getAllCommodityTypes();
        log.info(LogMessages.OPERATION_COMPLETED,"api.commodity_type", TraceIdUtil.get());
        return ResponseEntity.ok(ApiResponse.ok("Commodity type fetched successfully",commodityTypes));
    }
}
