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
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

import static com.buildgrid.mandipro.constants.LogMessages.NO_SUCH_FIELD_WARN;

/**
 * Loads native SQL queries from {@code classpath:app.sql} (key=value format)
 * and executes them by key via {@link EntityManager}.
 * <p>
 * Format of {@code app.sql}:
 * <pre>
 *   queryKey=SELECT * FROM some_table WHERE id = :id
 * </pre>
 *
 * <p>Supports both standard query execution and automatic result mapping
 * to target DTOs via reflection using SQL column aliases.
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
     * Creates a JPA native {@link Query} for the given key with named parameters applied.
     * Named parameters in SQL should use the {@code :paramName} placeholder syntax.
     *
     * <p>Example usage:
     * <pre>
     *   createNativeQuery("findUserById", Map.of("userId", 1L)).getSingleResult();
     * </pre>
     *
     * @param key    the query identifier as defined in {@code app.sql}
     * @param params map of named parameter names to their values
     * @return a configured {@link Query} ready to execute
     * @throws IllegalArgumentException if the key is not found in {@code app.sql}
     */
    public Query createNativeQuery(String key, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(getSql(key));
        params.forEach(query::setParameter);
        return query;
    }

    /**
     * Executes a native SQL query and automatically maps each result row to an
     * instance of the specified target class using reflection.
     *
     * <p>Mapping is driven by SQL column aliases — each alias must exactly match
     * (case-sensitive) a field name in the target class. Unmatched aliases are
     * silently skipped with a WARN log.
     *
     * <p>Example SQL alias convention:
     * <pre>
     *   SELECT u.unit_name AS unitName, u.unit_code AS unitCode FROM units u
     * </pre>
     *
     * <p>Example usage:
     * <pre>
     *   List&lt;UnitResponse&gt; units = executeAndMap("findAllUnits", Map.of(), UnitResponse.class);
     * </pre>
     *
     * @param key         the query identifier as defined in {@code app.sql}
     * @param params      map of named parameter names to their values
     * @param targetClass the class to map each row into; must have a no-arg constructor
     * @param <T>         the type of the mapped result objects
     * @return list of mapped objects; empty list if no rows returned
     * @throws RuntimeException if reflection instantiation or field assignment fails
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> executeAndMap(String key, Map<String, Object> params, Class<T> targetClass) {
        List<Object[]> rows = createNativeQuery(key, params).getResultList();
        List<String> columnNames = getColumnNames(key);

        return rows.stream()
                .map(row -> mapRow(row, columnNames, targetClass))
                .collect(Collectors.toList());
    }

    /**
     * Parses the SELECT clause of a SQL query to extract column aliases in order.
     * Aliases are extracted after the {@code AS} keyword (case-insensitive).
     * If no alias is present, the last word of the column expression is used.
     *
     * <p>Original casing of aliases is preserved to support camelCase field matching.
     *
     * @param key the query identifier used to retrieve the SQL from {@code app.sql}
     * @return ordered list of column alias names matching the SELECT clause sequence
     */
    private List<String> getColumnNames(String key) {
        String sql = getSql(key);
        String sqlLower = sql.toLowerCase();

        // use lowercase only to find positions
        String selectClause = sql.substring(sqlLower.indexOf("select") + 6, sqlLower.indexOf("from"));

        return Arrays.stream(selectClause.split(","))
                .map(col -> {
                    String trimmed = col.trim();
                    int asIndex = trimmed.toLowerCase().lastIndexOf(" as ");
                    return asIndex != -1
                            ? trimmed.substring(asIndex + 4).trim()  // preserves camelCase alias
                            : trimmed.substring(trimmed.lastIndexOf(" ") + 1).trim();
                })
                .collect(Collectors.toList());
    }

    /**
     * Maps a single result row ({@code Object[]}) to an instance of the target class
     * by matching column aliases to field names via reflection.
     *
     * <p>Fields are set using {@link Field #setAccessible(true)} to bypass access modifiers.
     * Null values in the row are skipped. Fields with no matching alias are silently ignored.
     *
     * @param row         the raw result row from the native query
     * @param columnNames ordered list of column aliases matching the row values by index
     * @param targetClass the class to instantiate and populate
     * @param <T>         the type of the result object
     * @return a populated instance of the target class
     * @throws RuntimeException if the target class cannot be instantiated or a field
     *                          cannot be accessed
     */
    private <T> T mapRow(Object[] row, List<String> columnNames, Class<T> targetClass) {
        try {
            T instance = targetClass.getDeclaredConstructor().newInstance();
            for (int i = 0; i < columnNames.size(); i++) {
                if (row[i] == null) continue;
                try {
                    Field field = getField(targetClass, columnNames.get(i));
                    field.setAccessible(true);
                    field.set(instance, convertValue(row[i], field.getType()));
                } catch (NoSuchFieldException ignored) {
                    // no matching field — skip
                    log.warn(NO_SUCH_FIELD_WARN, columnNames.get(i), targetClass.getSimpleName(), TraceIdUtil.get());
                }
            }
            return instance;
        } catch (Exception e) {
            throw new RuntimeException("Failed to map row to " + targetClass.getSimpleName(), e);
        }
    }

    /**
     * Recursively searches for a declared field by name, walking up the class hierarchy.
     * This allows mapping to work correctly when the target class extends a base class
     * (e.g., fields inherited from {@code BaseEntity}).
     *
     * @param clazz     the class to search, then its superclasses
     * @param fieldName the name of the field to find
     * @return the {@link Field} if found
     * @throws NoSuchFieldException if the field is not found in the class or any superclass
     */
    private Field getField(Class<?> clazz, String fieldName) throws NoSuchFieldException {
        try {
            return clazz.getDeclaredField(fieldName);
        } catch (NoSuchFieldException e) {
            if (clazz.getSuperclass() != null) {
                return getField(clazz.getSuperclass(), fieldName);
            }
            throw e;
        }
    }

    /**
     * Converts a raw database value to the required Java field type.
     * Handles common type mismatches between JDBC return types and Java field types.
     *
     * <p>Supported conversions:
     * <ul>
     *   <li>Any type → {@link String} via {@code String.valueOf()}</li>
     *   <li>{@link Number} → {@link Long} or {@code long}</li>
     *   <li>{@link Number} → {@link Integer} or {@code int}</li>
     *   <li>Any type → {@link BigDecimal} via {@code toString()}</li>
     *   <li>Any type → {@link Boolean} or {@code boolean} via {@code Boolean.valueOf()}</li>
     * </ul>
     *
     * <p>If the value is already assignable to the target type, it is returned as-is.
     *
     * @param value      the raw value returned from the database
     * @param targetType the Java type the value needs to be converted to
     * @return the converted value, or the original value if no conversion is needed
     */
    private Object convertValue(Object value, Class<?> targetType) {
        if (value == null) return null;
        if (targetType.isAssignableFrom(value.getClass())) return value;
        if (targetType == String.class) return String.valueOf(value);
        if (targetType == Long.class || targetType == long.class) return ((Number) value).longValue();
        if (targetType == Integer.class || targetType == int.class) return ((Number) value).intValue();
        if (targetType == BigDecimal.class) return new BigDecimal(value.toString());
        if (targetType == Boolean.class || targetType == boolean.class) return Boolean.valueOf(value.toString());
        return value;
    }
}
