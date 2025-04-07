package com.uade.tpo.demo.entity.dto;

import lombok.Data;

@Data
public class ProductRequest {
    private String nombre;
    private String description;
    private Double precio;
    private Integer stock;
    private Long categoriaId;
}
