package com.uade.tpo.demo.entity.dto;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequest {
    private Long userId;
    private Long cantidad;
    private List<CarritoDetalleDTO> carritoDetalle;
    private double total;
}