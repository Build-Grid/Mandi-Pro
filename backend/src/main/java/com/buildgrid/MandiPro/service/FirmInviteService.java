package com.buildgrid.mandipro.service;

import com.buildgrid.mandipro.dto.request.AcceptInviteRequest;
import com.buildgrid.mandipro.dto.request.FirmInviteCreateRequest;
import com.buildgrid.mandipro.dto.response.FirmInviteResponse;
import com.buildgrid.mandipro.dto.response.InvitePreviewResponse;
import com.buildgrid.mandipro.dto.response.UserResponse;

import java.util.List;
import java.util.UUID;

public interface FirmInviteService {
    FirmInviteResponse sendInvite(FirmInviteCreateRequest request);

    List<FirmInviteResponse> listInvites();

    void cancelInvite(UUID inviteId);

    FirmInviteResponse resendInvite(UUID inviteId);

    InvitePreviewResponse previewInvite(String token);

    UserResponse acceptInvite(AcceptInviteRequest request);
}

