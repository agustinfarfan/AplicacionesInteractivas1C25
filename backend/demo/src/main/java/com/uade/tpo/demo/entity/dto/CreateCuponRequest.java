package com.uade.tpo.demo.entity.dto;

import com.uade.tpo.demo.enums.TipoDescuento;
import lombok.Getter;

@Getter
public class CreateCuponRequest {
    private String nombre;
    private Long cantidadUsos;
    private TipoDescuento tipoDescuento;
    private Double descuento;
}
