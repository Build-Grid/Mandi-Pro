package com.buildgrid.mandipro.dto.response;

import com.buildgrid.mandipro.constants.PartyType;
import com.buildgrid.mandipro.constants.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartyResponse {
    private Long id;
    private String name;
    private PartyType type;
    private String contactNumber;
    private String address;
    private Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
