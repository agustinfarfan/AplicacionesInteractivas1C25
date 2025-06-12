package com.uade.tpo.demo.entity.dto;

import com.uade.tpo.demo.enums.TipoDescuento;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CuponDTO {
    private Long id;
    private String nombre;
    private Long cantidadUsos;
    private Long cantidadActual;
    private TipoDescuento tipoDescuento;
    private Double descuento;

}
