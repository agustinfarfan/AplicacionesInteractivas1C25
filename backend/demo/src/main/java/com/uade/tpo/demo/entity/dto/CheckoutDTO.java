package com.uade.tpo.demo.entity.dto;

import jakarta.persistence.Column;
import lombok.Getter;

@Getter
public class CheckoutDTO {
    private String nombre;
    private String apellido;
    private String metodoDeEnvio;
    private String direccion;
    private Long ultimosCuatroDigitos;
    private String email;
}