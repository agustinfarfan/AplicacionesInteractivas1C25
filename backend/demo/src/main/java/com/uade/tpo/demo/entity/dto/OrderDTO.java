package com.uade.tpo.demo.entity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class OrderDTO {
    private Long userId;
    private List<DetalleOrderDTO> detalleOrder;
    private Double total;

}