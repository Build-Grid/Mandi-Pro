package com.buildgrid.mandipro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@Table(name = "commodities")
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Commodity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "commodity_name", nullable = false)
    private String name;

    @Column(name = "local_name")
    private String localName;

    @Column(name = "description")
    private String description;

    @JoinColumn(name = "unit_id",referencedColumnName = "unit_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Unit unit;

    @JoinColumn(name = "commodity_type_id", referencedColumnName = "id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private CommodityType commodityType;

    @JoinColumn(name = "firm_id", referencedColumnName = "firm_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Firm firm;
}
