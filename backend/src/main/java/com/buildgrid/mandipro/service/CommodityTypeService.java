package com.buildgrid.mandipro.service;

import com.buildgrid.mandipro.dto.request.CommodityTypeRequest;
import com.buildgrid.mandipro.dto.request.CommodityTypeUpdateRequest;
import com.buildgrid.mandipro.dto.response.CommodityTypeResponse;

import java.util.List;

public interface CommodityTypeService {
    CommodityTypeResponse createCommodityType(CommodityTypeRequest commodityTypeRequest);
    CommodityTypeResponse updateCommodityType(CommodityTypeUpdateRequest commodityTypeUpdateRequest);
    void deleteCommodityType(Long id);
    CommodityTypeResponse getCommodityTypeById(Long id);
    List<CommodityTypeResponse> getAllCommodityTypes();
}
