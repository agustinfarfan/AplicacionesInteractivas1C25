package com.uade.tpo.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Data
@Entity
public class Publicacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "producto_id", referencedColumnName = "id", nullable = false)
    private Producto producto;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaPublicacion;

    @Column(nullable = false)
    private boolean visible;
}
