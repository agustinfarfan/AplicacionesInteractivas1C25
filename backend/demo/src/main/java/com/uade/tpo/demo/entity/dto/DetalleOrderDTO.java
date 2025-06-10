package com.uade.tpo.demo.entity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DetalleOrderDTO {
    private Long producto_id;
    private String nombre_producto;
    private String descripcion;
    private double precio_unitario;
    private int cantidad;
    private double subtotal;
}