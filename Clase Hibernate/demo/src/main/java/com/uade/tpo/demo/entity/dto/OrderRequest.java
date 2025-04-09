package com.uade.tpo.demo.entity.dto;

import lombok.Data;

@Data
public class OrderRequest {
    private Long userId;
    private Long cantidad;
}