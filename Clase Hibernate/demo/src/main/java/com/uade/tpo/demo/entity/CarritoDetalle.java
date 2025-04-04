package com.uade.tpo.demo.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CarritoDetalle {


    public CarritoDetalle(Carrito carrito, Producto producto) {
        this.carrito = carrito;
        this.producto = producto;
        this.cantidad = 1;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "carrito_id")
    private Carrito carrito;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private int cantidad;

}
