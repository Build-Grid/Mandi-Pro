package com.buildgrid.mandipro.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCurrentUserProfileRequest {

    @Size(max = 100, message = "First name can have at most 100 characters")
    private String firstName;

    @Size(max = 100, message = "Last name can have at most 100 characters")
    private String lastName;
}

