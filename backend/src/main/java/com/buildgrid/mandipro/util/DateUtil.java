package com.buildgrid.mandipro.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public final class DateUtil {
    private DateUtil() {}

    public static LocalDateTime now() {
        return LocalDateTime.now();
    }

    public static String format(LocalDateTime date, String pattern) {
        if (date == null) return null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return date.format(formatter);
    }

    public static long toEpoch(LocalDateTime date) {
        if (date == null) return 0L;
        return date.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    public static LocalDateTime fromEpoch(long epoch) {
        return LocalDateTime.ofInstant(new Date(epoch).toInstant(), ZoneId.systemDefault());
    }
}
