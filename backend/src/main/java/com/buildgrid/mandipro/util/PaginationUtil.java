package com.buildgrid.mandipro.util;

import com.buildgrid.mandipro.constants.AppConstants;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public final class PaginationUtil {
    private PaginationUtil() {}

    public static Pageable toPageable(Integer page, Integer size, Sort sort) {
        int pageNumber = (page != null && page >= 0) ? page : AppConstants.DEFAULT_PAGE_NUMBER;
        int pageSize = (size != null && size > 0) ? (size > AppConstants.MAX_PAGE_SIZE ? AppConstants.MAX_PAGE_SIZE : size) : AppConstants.DEFAULT_PAGE_SIZE;
        return PageRequest.of(pageNumber, pageSize, sort);
    }

    public static void validate(Integer page, Integer size) {
        if (page != null && page < 0) {
            throw new IllegalArgumentException("Page number cannot be less than zero");
        }
        if (size != null && size <= 0) {
            throw new IllegalArgumentException("Page size must be greater than zero");
        }
    }
}
