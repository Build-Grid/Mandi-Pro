package com.buildgrid.mandipro.util;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Properties;

/**
 * Loads native SQL queries from {@code classpath:app.sql} (key=value format)
 * and executes them by key via {@link EntityManager}.
 * <p>
 * Format of {@code app.sql}:
 * <pre>
 *   queryKey=SELECT * FROM some_table WHERE id = :id
 * </pre>
 */
@Slf4j
@Component
public class AppSqlLoader {

    @PersistenceContext
    private EntityManager entityManager;

    private Properties queries;

    @PostConstruct
    void loadQueries() throws IOException {
        queries = new Properties();
        try (InputStream stream = new ClassPathResource("app.sql").getInputStream()) {
            queries.load(stream);
        }
        log.info("Loaded {} custom SQL query/queries from app.sql", queries.size());
    }

    /**
     * Returns the raw SQL string for the given key.
     *
     * @throws IllegalArgumentException if the key is not found in {@code app.sql}
     */
    public String getSql(String key) {
        String sql = queries.getProperty(key);
        if (sql == null || sql.isBlank()) {
            throw new IllegalArgumentException("No SQL query found for key: " + key);
        }
        return sql;
    }

    /**
     * Creates a native {@link Query} for the given key with the supplied named parameters.
     *
     * @param key    key in {@code app.sql}
     * @param params named parameters ({@code :paramName} placeholders)
     * @return configured {@link Query}, ready to execute
     */
    public Query createNativeQuery(String key, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(getSql(key));
        params.forEach(query::setParameter);
        return query;
    }
}
