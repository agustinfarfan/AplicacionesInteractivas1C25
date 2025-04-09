package com.uade.tpo.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class DetalleOrder {

    public DetalleOrder() {
    }

    public DetalleOrder(int cantidad, double precioUnitario, Order Order, Producto producto) {
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.Order = Order;
        this.producto = producto;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int cantidad;

    @Column
    private double precioUnitario;

    @ManyToOne
    @JoinColumn(name = "Order_id")
    private Order Order;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;
}
