package com.buildgrid.mandipro.dto.response;

import com.buildgrid.mandipro.constants.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private Long firmId;
    private Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
