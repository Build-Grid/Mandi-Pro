package com.buildgrid.mandipro.dto.mapper;

import com.buildgrid.mandipro.dto.response.UnitResponse;
import com.buildgrid.mandipro.entity.Unit;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UnitMapper {

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "unitName", source = "unitName"),
            @Mapping(target = "unitCode", source = "unitCode"),
            @Mapping(target = "unitType", source = "unitType"),
            @Mapping(target = "baseUnitCode", source = "baseUnit.unitCode"),
            @Mapping(target = "conversionFactor", source = "conversionFactor")
    })
    UnitResponse toUnitResponse(Unit unit);

    List<UnitResponse> toUnitResponseList(List<Unit> units);
}
