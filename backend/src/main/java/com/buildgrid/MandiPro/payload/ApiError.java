package com.buildgrid.mandipro.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiError {
    private boolean success;
    private int statusCode;
    private String message;
    private String traceId;
    private LocalDateTime timestamp;
    @Builder.Default
    private List<FieldError> errors = new ArrayList<>();

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class FieldError {
        private String field;
        private String message;
        private Object rejectedValue;
    }

    public void addFieldError(String field, String message, Object rejectedValue) {
        if (this.errors == null) {
            this.errors = new ArrayList<>();
        }
        this.errors.add(new FieldError(field, message, rejectedValue));
    }
}
