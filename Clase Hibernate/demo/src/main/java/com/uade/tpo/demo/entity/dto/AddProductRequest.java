package com.uade.tpo.demo.entity.dto;

import lombok.Data;

@Data
public class AddProductRequest {
    private Long productId;
    private int cantidad;
}
