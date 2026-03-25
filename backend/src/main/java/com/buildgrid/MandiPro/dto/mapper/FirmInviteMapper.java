package com.buildgrid.mandipro.dto.mapper;

import com.buildgrid.mandipro.dto.request.AcceptInviteRequest;
import com.buildgrid.mandipro.dto.request.FirmInviteCreateRequest;
import com.buildgrid.mandipro.dto.response.FirmInviteResponse;
import com.buildgrid.mandipro.dto.response.InvitePreviewResponse;
import com.buildgrid.mandipro.entity.Firm;
import com.buildgrid.mandipro.entity.FirmInvite;
import com.buildgrid.mandipro.entity.Role;
import com.buildgrid.mandipro.entity.User;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

import java.time.LocalDateTime;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface FirmInviteMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "email", source = "request.email")
    @Mapping(target = "username", source = "request.username")
    @Mapping(target = "role", source = "request.role")
    @Mapping(target = "firm", source = "firm")
    @Mapping(target = "invitedByUser", source = "inviter")
    @Mapping(target = "token", source = "token")
    @Mapping(target = "expiresAt", source = "expiresAt")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "inviteStatus", expression = "java(com.buildgrid.mandipro.constants.InviteStatus.PENDING)")
    FirmInvite toInviteEntity(FirmInviteCreateRequest request,
                              Firm firm,
                              User inviter,
                              String token,
                              LocalDateTime expiresAt);

    @Mapping(target = "id", source = "invite.id")
    @Mapping(target = "firmId", source = "invite", qualifiedByName = "getFirmId")
    @Mapping(target = "firmName", source = "invite", qualifiedByName = "getFirmName")
    @Mapping(target = "invitedByUserId", source = "invite", qualifiedByName = "getInvitedByUserId")
    @Mapping(target = "invitedByName", source = "invite", qualifiedByName = "resolveInvitedByName")
    @Mapping(target = "status", source = "invite.inviteStatus")
    FirmInviteResponse toResponse(FirmInvite invite);

    @Mapping(target = "firmName", source = "invite", qualifiedByName = "getFirmName")
    @Mapping(target = "email", source = "invite.email")
    @Mapping(target = "role", source = "invite.role")
    @Mapping(target = "expiresAt", source = "invite.expiresAt")
    InvitePreviewResponse toPreviewResponse(FirmInvite invite);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "username", source = "invite.username")
    @Mapping(target = "email", source = "invite.email")
    @Mapping(target = "firstName", source = "request.firstName")
    @Mapping(target = "lastName", source = "request.lastName")
    @Mapping(target = "password", source = "encodedPassword")
    @Mapping(target = "firm", source = "invite.firm")
    @Mapping(target = "role", source = "role")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "status", ignore = true)
    User toUserEntity(FirmInvite invite,
                      AcceptInviteRequest request,
                      String encodedPassword,
                      Role role);

    @Named("resolveInvitedByName")
    default String resolveInvitedByName(FirmInvite invite) {
        if (invite == null || invite.getInvitedByUser() == null) {
            return null;
        }
        User inviter = invite.getInvitedByUser();
        String firstName = StringUtils.trimToNull(inviter.getFirstName());
        String lastName = StringUtils.trimToNull(inviter.getLastName());
        String fullName = StringUtils.trimToNull(
            (firstName == null ? "" : firstName) + (lastName == null ? "" : " " + lastName)
        );
        return fullName;
    }

    @Named("getFirmId")
    default Long getFirmId(FirmInvite invite) {
        return invite != null && invite.getFirm() != null ? invite.getFirm().getId() : null;
    }

    @Named("getFirmName")
    default String getFirmName(FirmInvite invite) {
        return invite != null && invite.getFirm() != null ? invite.getFirm().getName() : null;
    }

    @Named("getInvitedByUserId")
    default Long getInvitedByUserId(FirmInvite invite) {
        return invite != null && invite.getInvitedByUser() != null ? invite.getInvitedByUser().getId() : null;
    }
}



