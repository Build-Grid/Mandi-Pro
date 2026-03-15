package com.buildgrid.mandipro.entity;

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
    private Integer id;

    @Column(name = "firm_name", nullable = false)
    private String name;
}
