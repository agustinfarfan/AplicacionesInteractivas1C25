package com.uade.tpo.demo.entity;

import com.uade.tpo.demo.entity.dto.CarritoDetalleDTO;
import com.uade.tpo.demo.entity.dto.DetalleOrderDTO;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class DetalleOrder {

    public DetalleOrder() {
    }

    public DetalleOrder(int cantidad, double subtotal, Order order, Producto producto) {
        this.cantidad = cantidad;
        this.subtotal = subtotal;
        this.order = order;
        this.producto = producto;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int cantidad;

    @Column
    private double subtotal;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;


    public DetalleOrderDTO getDTO() {
        return DetalleOrderDTO.builder()
                .producto_id(producto.getId())
                .nombre_producto(producto.getNombre())
                .descripcion(producto.getDescription())
                .cantidad(this.cantidad)
                .precio_unitario(producto.getPrecio())
                .subtotal(this.subtotal)
                .build();
    }

}
