package com.uade.tpo.demo.entity.dto;

import com.uade.tpo.demo.entity.Producto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CarritoDetalleDTO {
    private Long producto_id;
    private String nombre_producto;
    private String descripcion;
    private double precio_unitario;
    private int cantidad;
    private double subtotal;
}
