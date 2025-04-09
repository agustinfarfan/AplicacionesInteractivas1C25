package com.uade.tpo.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class MetodoDePago {
    
    public MetodoDePago() {
    }

    public MetodoDePago(String nombre) {
        this.nombre = nombre;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String nombre;
}
