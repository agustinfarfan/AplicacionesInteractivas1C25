package com.uade.tpo.demo.entity.dto;

import lombok.Data;
import java.util.Date;

@Data
public class PublicacionRequest {
    private Long productoId;
    private Long vendedorId;
    private Date fechaPublicacion;
}
