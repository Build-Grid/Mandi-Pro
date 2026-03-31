package com.buildgrid.mandipro.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateFirmProfileRequest {

    @NotBlank(message = "Firm name is required")
    @Size(max = 150, message = "Firm name can have at most 150 characters")
    private String firmName;
}

