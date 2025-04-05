package com.uade.tpo.demo.entity;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class CarritoDetalle {


    public CarritoDetalle(Producto producto, int cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
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

    public double obtenerSubTotal() {
        return producto.getPrecio() * cantidad;
    }

    public boolean tieneProducto(Long productoId) {
        return producto.getId().equals(productoId);
    }

    public void sumarCantidad(int cantidad) {
        this.cantidad += cantidad;
    }

}
