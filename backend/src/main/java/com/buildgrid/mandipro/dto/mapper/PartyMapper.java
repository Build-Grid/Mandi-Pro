package com.buildgrid.mandipro.dto.mapper;

import com.buildgrid.mandipro.dto.request.PartyRequest;
import com.buildgrid.mandipro.dto.response.PartyResponse;
import com.buildgrid.mandipro.entity.Party;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PartyMapper {

    PartyResponse toResponse(Party party);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "firm", ignore = true)
    Party toEntity(PartyRequest request);

    List<PartyResponse> toResponseList(List<Party> parties);
}
