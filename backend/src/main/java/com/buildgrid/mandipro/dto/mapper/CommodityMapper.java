package com.buildgrid.mandipro.dto.mapper;

import com.buildgrid.mandipro.dto.request.CommodityRequest;
import com.buildgrid.mandipro.dto.response.CommodityResponse;
import com.buildgrid.mandipro.entity.Commodity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommodityMapper {

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "localName", source = "localName"),
            @Mapping(target = "description", source = "description"),
            @Mapping(target = "unit", ignore = true),
            @Mapping(target = "commodityType", ignore = true),
            @Mapping(target = "firm", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),
            @Mapping(target = "createdBy", ignore = true),
            @Mapping(target = "updatedBy", ignore = true),
            @Mapping(target = "status", ignore = true)
    })
    Commodity toCommodityEntity(CommodityRequest commodityRequest);

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "localName", source = "localName"),
            @Mapping(target = "description", source = "description"),
            @Mapping(target = "unitCode", source = "unit.unitCode"),
            @Mapping(target = "commodityTypeName", source = "commodityType.typeName"),
            @Mapping(target = "firmId", source= "firm.id"),
            @Mapping(target = "createdAt", source = "createdAt"),
            @Mapping(target = "updatedAt", source = "updatedAt"),
            @Mapping(target = "createdBy", source = "createdBy"),
            @Mapping(target = "updatedBy", source = "updatedBy")
    })
    CommodityResponse toCommodityResponse(Commodity commodity);

    List<CommodityResponse> toCommodityResponseList(List<Commodity> commodityList);
}
