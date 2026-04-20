package com.buildgrid.mandipro.entity;

import com.buildgrid.mandipro.constants.LedgerDirection;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "party_ledger")
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PartyLedger extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id", nullable = false)
    private Party party;

    @Column(name = "entry_date", nullable = false)
    private LocalDateTime entryDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LedgerDirection direction;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    @Column(name = "reference_type")
    private String referenceType;

    @Column(name = "reference_id")
    private Long referenceId;

    @Column(name = "running_balance", nullable = false, precision = 19, scale = 2)
    private BigDecimal runningBalance;

    @Column
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "firm_id", nullable = false)
    private Firm firm;
}
