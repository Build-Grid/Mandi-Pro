package com.buildgrid.mandipro.dto.mapper;

import com.buildgrid.mandipro.dto.request.RegisterRequest;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    @Mapping(target = "role", source = "user.role.name")
    @Mapping(target = "firmId", source = "user.firm.id")
    UserResponse toResponse(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "firm", ignore = true)
    User toEntity(RegisterRequest request);

    List<UserResponse> toResponseList(List<User> users);
}
