package com.buildgrid.mandipro.dto.mapper;

import com.buildgrid.mandipro.dto.request.RegisterFirmRequest;
import com.buildgrid.mandipro.dto.response.FirmProfileResponse;
import com.buildgrid.mandipro.entity.Firm;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface FirmMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", source = "firmName")
    Firm toEntity(RegisterFirmRequest registerFirmRequest);

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "createAt", source = "createdAt"),
            @Mapping(target = "planType", source = "planType"),
            @Mapping(target = "ownerName", ignore = true),
            @Mapping(target = "ownerEmail", ignore = true)
    })
    FirmProfileResponse toFirmProfileResponse(Firm firm);
}
