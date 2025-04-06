package com.uade.tpo.demo.entity.dto;

import lombok.Data;

@Data
public class ClienteRequest {
    private String razonSocial;
    private String cuil;
    private String calle;
    private String altura;
    private String codigoPostal;
    private String localidad;
    private String provincia;
}
