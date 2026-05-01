package com.buildgrid.mandipro.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
    // Cache configuration is enabled with defaults
    // In-memory caching using ConcurrentHashMap
}

