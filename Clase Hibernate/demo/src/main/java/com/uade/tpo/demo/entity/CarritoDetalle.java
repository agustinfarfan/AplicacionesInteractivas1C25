package com.uade.tpo.demo.entity;


import com.uade.tpo.demo.entity.dto.CarritoDetalleDTO;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
public class CarritoDetalle {

    public CarritoDetalle() {}

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

    public void ajustarCantidad(int cantidad) {
        this.cantidad += cantidad;
    }

    public CarritoDetalleDTO getDTO() {
        return CarritoDetalleDTO.builder()
                .nombre_producto(producto.getNombre())
                .cantidad(this.cantidad)
                .precio_unitario(producto.getPrecio())
                .subtotal(this.obtenerSubTotal())
                .build();
    }
}
