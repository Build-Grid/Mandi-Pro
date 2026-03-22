package com.buildgrid.mandipro.dto.mapper;

import com.buildgrid.mandipro.dto.request.RegisterFirmRequest;
import com.buildgrid.mandipro.entity.Firm;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface FirmMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", source = "firmName")
    Firm toEntity(RegisterFirmRequest registerFirmRequest);
}
