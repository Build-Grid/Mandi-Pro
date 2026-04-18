package com.buildgrid.mandipro.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FirmProfileResponse {
    Long id;
    String name;
    String ownerName;
    String ownerEmail;
    LocalDateTime createAt;
}
