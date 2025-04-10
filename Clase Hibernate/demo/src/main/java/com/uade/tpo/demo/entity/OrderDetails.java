package com.uade.tpo.demo.entity;


import com.uade.tpo.demo.entity.dto.CarritoDetalleDTO;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
public class OrderDetails {

    public OrderDetails() {}

    public OrderDetails(Producto producto, int cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private int cantidad;

    public double obtenerSubTotal() {
        return producto.getPrecio() * cantidad;
    }

    public void ajustarCantidad(int cantidad) {
        this.cantidad += cantidad;
    }

}
