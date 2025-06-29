package com.uade.tpo.demo.entity.dto;

import com.uade.tpo.demo.entity.CarritoDetalle;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.enums.EstadoCarrito;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class CarritoDTO {
    private List<CarritoDetalleDTO> carritoDetalle;
    private double descuento;
    private double total;
}
