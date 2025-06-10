package com.uade.tpo.demo.entity.dto;

import com.uade.tpo.demo.enums.EstadoOrder;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class OrderDTO {
    private Long orderId;
    private Long userId;
    private List<DetalleOrderDTO> detalleOrder;
    private Double total;
    private LocalDateTime createdAt;
    private EstadoOrder estado;
    private String metodoDeEnvio;
    private String direccion;
    private Long ultimosCuatroDigitos;
    private String nombre;
    private String apellido;
    private String email;

}