package com.uade.tpo.demo.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data @Builder @AllArgsConstructor
public class ShippingAddressDTO {
    private Long id;
    private String alias;
    private String calle;
    private Integer altura;
    private String codigoPostal;
    private String localidad;
    private String provincia;
}
