package com.uade.tpo.demo.entity;

import com.uade.tpo.demo.enums.EstadoCarrito;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Carrito {

    public Carrito(Usuario usuario) {
        this.usuario = usuario;
        this.estado = EstadoCarrito.ACTIVO;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<CarritoDetalle> carritoDetalle = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private EstadoCarrito estado;

    @CreationTimestamp
    private Date fechaCreacion;

    @UpdateTimestamp
    private Date updatedAt;

    private Date expirationDate;

    public void agregarDetalle(CarritoDetalle carritoDetalle) {
        carritoDetalle.setCarrito(this);
        this.carritoDetalle.add(carritoDetalle);
    }

}
