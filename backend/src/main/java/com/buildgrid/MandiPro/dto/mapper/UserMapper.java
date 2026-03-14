package com.buildgrid.mandipro.dto.mapper;

import com.buildgrid.mandipro.dto.request.RegisterRequest;
import com.buildgrid.mandipro.dto.response.UserResponse;
import com.buildgrid.mandipro.entity.Role;
import com.buildgrid.mandipro.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    @Mapping(target = "role", source = "role.name")
    UserResponse toResponse(User user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    User toEntity(RegisterRequest request);

    List<UserResponse> toResponseList(List<User> users);
}
