package com.buildgrid.mandipro.controller;

import com.buildgrid.mandipro.constants.ApiPaths;
import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.dto.request.PartyRequest;
import com.buildgrid.mandipro.dto.response.PartyResponse;
import com.buildgrid.mandipro.payload.ApiResponse;
import com.buildgrid.mandipro.service.PartyService;
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

import static com.buildgrid.mandipro.payload.ApiResponse.ok;

@RestController
@RequestMapping(ApiPaths.PARTIES)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Party Management", description = "Endpoints for managing parties (Farmers, Dealers, etc.).")
public class PartyController {

    private final PartyService partyService;

    @Operation(summary = "Create a new party", description = "Creates a new external party for the firm.")
    @PostMapping
    public ResponseEntity<ApiResponse<PartyResponse>> createParty(@Valid @RequestBody PartyRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "api.parties.create", TraceIdUtil.get());
        PartyResponse response = partyService.createParty(request);
        log.info(LogMessages.OPERATION_COMPLETED, "api.parties.create", TraceIdUtil.get());
        return ResponseEntity.status(HttpStatus.CREATED).body(ok("Party created successfully", response));
    }

    @Operation(summary = "Create multiple parties", description = "Creates multiple external parties for the firm in bulk.")
    @PostMapping(ApiPaths.PARTIES_BULK)
    public ResponseEntity<ApiResponse<List<PartyResponse>>> createParties(@Valid @RequestBody List<PartyRequest> requests) {
        log.info(LogMessages.OPERATION_STARTED, "api.parties.createBulk", TraceIdUtil.get());
        List<PartyResponse> response = partyService.createParties(requests);
        log.info(LogMessages.OPERATION_COMPLETED_WITH_COUNT, "api.parties.createBulk", response.size(), TraceIdUtil.get());
        return ResponseEntity.status(HttpStatus.CREATED).body(ok("Parties created successfully", response));
    }

    @Operation(summary = "Get party details", description = "Returns details of a specific party by ID.")
    @GetMapping(ApiPaths.PARTIES_BY_ID)
    public ResponseEntity<ApiResponse<PartyResponse>> getParty(@PathVariable Long id) {
        log.info(LogMessages.OPERATION_STARTED, "api.parties.get", TraceIdUtil.get());
        PartyResponse response = partyService.getParty(id);
        log.info(LogMessages.OPERATION_COMPLETED, "api.parties.get", TraceIdUtil.get());
        return ResponseEntity.ok(ok("Party fetched successfully", response));
    }

    @Operation(summary = "Update party details", description = "Updates details of a specific party by ID.")
    @PutMapping(ApiPaths.PARTIES_BY_ID)
    public ResponseEntity<ApiResponse<PartyResponse>> updateParty(@PathVariable Long id, @Valid @RequestBody PartyRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "api.parties.update", TraceIdUtil.get());
        PartyResponse response = partyService.updateParty(id, request);
        log.info(LogMessages.OPERATION_COMPLETED, "api.parties.update", TraceIdUtil.get());
        return ResponseEntity.ok(ok("Party updated successfully", response));
    }

    @Operation(summary = "Fetch all parties", description = "Returns a list of all active parties associated with the firm.")
    @GetMapping
    public ResponseEntity<ApiResponse<List<PartyResponse>>> getAllParties() {
        log.info(LogMessages.OPERATION_STARTED, "api.parties.getAll", TraceIdUtil.get());
        List<PartyResponse> response = partyService.getAllParties();
        log.info(LogMessages.OPERATION_COMPLETED_WITH_COUNT, "api.parties.getAll", response.size(), TraceIdUtil.get());
        return ResponseEntity.ok(ok("Parties fetched successfully", response));
    }

    @Operation(summary = "Delete a party", description = "Soft deletes a specific party from the firm.")
    @DeleteMapping(ApiPaths.PARTIES_BY_ID)
    public ResponseEntity<ApiResponse<Void>> deleteParty(@PathVariable Long id) {
        log.info(LogMessages.OPERATION_STARTED, "api.parties.delete", TraceIdUtil.get());
        partyService.deleteParty(id);
        log.info(LogMessages.OPERATION_COMPLETED, "api.parties.delete", TraceIdUtil.get());
        return ResponseEntity.ok(ok("Party deleted successfully", null));
    }
}
