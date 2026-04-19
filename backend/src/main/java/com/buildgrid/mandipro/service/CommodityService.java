package com.buildgrid.mandipro.service;

import com.buildgrid.mandipro.dto.request.CommodityRequest;
import com.buildgrid.mandipro.dto.response.CommodityResponse;

import java.util.List;

public interface CommodityService {
    CommodityResponse createCommodity(CommodityRequest commodityRequest);
    CommodityResponse updateCommodity(CommodityRequest commodityRequest, Long commodityId);
    void deleteCommodity(Long commodityId);
    CommodityResponse fetchCommodityById(Long commodityId);
    List<CommodityResponse> fetchAllCommodities();
}
