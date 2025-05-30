package com.uade.tpo.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "sales_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long cantidad;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
