package com.uade.tpo.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "sales_order")
public class Order {

    public Order() {}

    public Order(double cantidad, User user) {
        this.cantidad = cantidad;
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private double cantidad;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
