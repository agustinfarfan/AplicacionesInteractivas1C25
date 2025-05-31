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
    private String nombre_producto;
    private double precio_unitario;
    private int cantidad;
    private double subtotal;
}
