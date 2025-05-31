package com.uade.tpo.demo.entity.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CartProductRequest {
    @NotNull
    private Long productId;
    @NotNull
    private Integer cantidad;
}
