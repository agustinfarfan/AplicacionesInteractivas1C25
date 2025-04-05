package com.uade.tpo.demo.entity.dto;

import lombok.Data;

@Data
public class CategoriaRequest {
    private String nombre;
    private String descripcion;
    private Long categoriaPadre;
}
