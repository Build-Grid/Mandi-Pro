package com.buildgrid.mandipro.dto.mapper;

import com.buildgrid.mandipro.dto.request.CommodityTypeRequest;
import com.buildgrid.mandipro.dto.response.CommodityTypeResponse;
import com.buildgrid.mandipro.entity.CommodityType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommodityTypeMapper {

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "typeName", source = "typeName"),
            @Mapping(target = "description", source = "description"),
            @Mapping(target = "firm", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),
            @Mapping(target = "createdBy", ignore = true),
            @Mapping(target = "updatedBy", ignore = true),
            @Mapping(target = "status", ignore = true)
    })
    CommodityType toCommodityTypeEntity(CommodityTypeRequest commodityTypeRequest);

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "typeName", source = "typeName"),
            @Mapping(target = "description", source = "description"),
            @Mapping(target = "firmId", source= "firm.id"),
            @Mapping(target = "createdAt", source = "createdAt"),
            @Mapping(target = "updatedAt", source = "updatedAt"),
            @Mapping(target = "createdBy", source = "createdBy"),
            @Mapping(target = "updatedBy", source = "updatedBy")
    })
    CommodityTypeResponse toCommodityTypeResponse(CommodityType commodityType);

    List<CommodityTypeResponse> toCommodityTypeResponseList(List<CommodityType> commodityTypes);
}

