package com.buildgrid.mandipro.dto.request;

import com.buildgrid.mandipro.constants.PartyType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartyUpdateRequest {
    private String name;

    private PartyType type;

    private String contactNumber;

    private String address;

    private String village;

    private String description;
}
