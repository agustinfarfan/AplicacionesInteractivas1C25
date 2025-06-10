package com.uade.tpo.demo.entity.dto;

import lombok.Data;

@Data
public class ShippingAddressRequest {
    private String alias;
    private String calle;
    private Integer altura;
    private String codigoPostal;
    private String localidad;
    private String provincia;
}
