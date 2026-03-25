package com.buildgrid.mandipro.exception;

import com.buildgrid.mandipro.payload.ApiError;
import com.buildgrid.mandipro.util.TraceIdUtil;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.IdentityHashMap;
import java.util.Set;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiError> handleAppException(AppException ex) {
        logException(ex);
        return buildErrorResponse(ex.getStatus(), ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException ex) {
        logException(ex);
        ApiError error = createBaseError(HttpStatus.UNPROCESSABLE_ENTITY, "Validation failed");
        ex.getBindingResult().getFieldErrors().forEach(fieldError ->
                error.addFieldError(fieldError.getField(), fieldError.getDefaultMessage(), fieldError.getRejectedValue())
        );
        return new ResponseEntity<>(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiError> handleConstraintViolationException(ConstraintViolationException ex) {
        logException(ex);
        ApiError error = createBaseError(HttpStatus.UNPROCESSABLE_ENTITY, "Constraint violation");
        ex.getConstraintViolations().forEach(violation ->
                error.addFieldError(violation.getPropertyPath().toString(), violation.getMessage(), violation.getInvalidValue())
        );
        return new ResponseEntity<>(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiError> handleAccessDeniedException(AccessDeniedException ex) {
        logException(ex);
        return buildErrorResponse(HttpStatus.FORBIDDEN, "Access denied");
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiError> handleBadCredentialsException(BadCredentialsException ex) {
        logException(ex);
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleMessageNotReadableException(HttpMessageNotReadableException ex) {
        logException(ex);
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Malformed JSON request" + ex.getMessage());
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiError> handleMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        logException(ex);
        return buildErrorResponse(HttpStatus.METHOD_NOT_ALLOWED, ex.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        logException(ex);
        return buildErrorResponse(HttpStatus.CONFLICT, "Database integrity violation");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneralException(Exception ex) {
        logException(ex);
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred");
    }

    private void logException(Exception ex) {
        String traceId = TraceIdUtil.get();
        String exceptionTree = buildExceptionTree(ex);

        log.error("""
                Exception captured | traceId: %s
                Type: %s
                Message: %s
                Cause tree:
                %s
                """.formatted(
                traceId,
                ex.getClass().getSimpleName(),
                ex.getMessage(),
                exceptionTree
        ), ex);
    }

    private String buildExceptionTree(Throwable throwable) {
        if (throwable == null) {
            return "  - <none>";
        }

        StringBuilder builder = new StringBuilder();
        Set<Throwable> visited = Collections.newSetFromMap(new IdentityHashMap<>());
        Throwable cursor = throwable;
        int depth = 0;

        while (cursor != null && visited.add(cursor)) {
            String indent = "  ".repeat(depth);
            String message = cursor.getMessage() == null ? "<no-message>" : cursor.getMessage();
            builder.append(indent)
                    .append("- ")
                    .append(cursor.getClass().getSimpleName())
                    .append(": ")
                    .append(message)
                    .append(System.lineSeparator());

            cursor = cursor.getCause();
            depth++;
        }

        if (cursor != null) {
            builder.append("  ".repeat(depth))
                    .append("- <cycle-detected>")
                    .append(System.lineSeparator());
        }

        return builder.toString().trim();
    }

    private ResponseEntity<ApiError> buildErrorResponse(HttpStatus status, String message) {
        return new ResponseEntity<>(createBaseError(status, message), status);
    }

    private ApiError createBaseError(HttpStatus status, String message) {
        return ApiError.builder()
                .success(false)
                .statusCode(status.value())
                .message(message)
                .traceId(TraceIdUtil.get())
                .timestamp(LocalDateTime.now())
                .build();
    }
}
