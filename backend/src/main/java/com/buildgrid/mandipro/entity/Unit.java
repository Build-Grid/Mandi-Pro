package com.buildgrid.mandipro.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "units")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Unit extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "unit_id")
    private long id;

    @Column(name = "unit_name", nullable = false, length = 100)
    private String unitName;

    @Column(name = "unit_code", nullable = false, length = 20)
    private String unitCode;

    @Column(name = "unit_type", nullable = false, length = 50)
    private String unitType;

    @JoinColumn(name = "base_unit_id", referencedColumnName = "unit_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Unit baseUnit;

    @Column(name = "conversion_factor", nullable = false, precision = 15, scale = 6)
    private BigDecimal conversionFactor;
}
