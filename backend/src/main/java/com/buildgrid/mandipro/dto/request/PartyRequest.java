package com.buildgrid.mandipro.dto.request;

import com.buildgrid.mandipro.constants.PartyType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartyRequest {

    @NotBlank(message = "Party name is required")
    private String name;

    @NotNull(message = "Party type is required")
    private PartyType type;

    private String contactNumber;

    private String address;
}
