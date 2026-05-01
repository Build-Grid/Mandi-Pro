package com.buildgrid.mandipro.dto.mapper;

import com.buildgrid.mandipro.dto.request.ReviewRequest;
import com.buildgrid.mandipro.dto.response.ReviewResponse;
import com.buildgrid.mandipro.entity.ReviewEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ReviewMapper {

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "review", source = "review"),
            @Mapping(target = "rating", source = "rating"),
            @Mapping(target = "reviewStatus", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),
            @Mapping(target = "createdBy", ignore = true),
            @Mapping(target = "updatedBy", ignore = true),
            @Mapping(target = "status", ignore = true)
    })
    ReviewEntity toReviewEntity(ReviewRequest reviewRequest);

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "review", source = "review"),
            @Mapping(target = "rating", source = "rating"),
            @Mapping(target = "reviewStatus", source = "reviewStatus"),
            @Mapping(target = "createdAt", source = "createdAt"),
            @Mapping(target = "updatedAt", source = "updatedAt")
    })
    ReviewResponse toReviewResponse(ReviewEntity reviewEntity);

    List<ReviewResponse> toReviewResponseList(List<ReviewEntity> reviewEntityList);
}


