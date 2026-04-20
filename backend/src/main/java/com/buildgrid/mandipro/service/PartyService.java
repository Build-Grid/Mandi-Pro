package com.buildgrid.mandipro.service;

import com.buildgrid.mandipro.dto.request.PartyRequest;
import com.buildgrid.mandipro.dto.response.PartyResponse;

import java.util.List;

public interface PartyService {
    PartyResponse createParty(PartyRequest request);
    List<PartyResponse> createParties(List<PartyRequest> requests);
    PartyResponse updateParty(Long id, PartyRequest request);
    PartyResponse getParty(Long id);
    List<PartyResponse> getAllParties();
    void deleteParty(Long id);
}
