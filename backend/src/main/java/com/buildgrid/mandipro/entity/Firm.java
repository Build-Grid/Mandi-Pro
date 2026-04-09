package com.buildgrid.mandipro.entity;

import com.buildgrid.mandipro.constants.PlanTypeConstans;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@Table(name = "firms")
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Firm extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "firm_id")
    private Long id;

    @Column(name = "firm_name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name ="plan_type",nullable = false)
    @Builder.Default
    private PlanTypeConstans planType=PlanTypeConstans.STANDARD;
}
