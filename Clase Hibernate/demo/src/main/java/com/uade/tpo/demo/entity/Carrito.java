package com.uade.tpo.demo.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.uade.tpo.demo.entity.dto.CarritoDTO;
import com.uade.tpo.demo.enums.EstadoCarrito;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@Getter
@Setter
@Entity
public class Carrito {

    public Carrito() {}

    public Carrito(User User) {
        this.User = User;
        this.estado = EstadoCarrito.ACTIVO;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    private User User;

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CarritoDetalle> carritoDetalle = new HashSet<CarritoDetalle>();

    @Enumerated(EnumType.STRING)
    private EstadoCarrito estado;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime expirationDate;

    public void agregarDetalle(CarritoDetalle carritoDetalle) {
        this.carritoDetalle.add(carritoDetalle);
        carritoDetalle.setCarrito(this);
    }

    public double getTotal() {
        return carritoDetalle.stream().mapToDouble(CarritoDetalle::obtenerSubTotal).sum();
    }

    public CarritoDTO getDTO() {
        return CarritoDTO.builder()
                .carritoDetalle(this.carritoDetalle.stream()
                        .map(CarritoDetalle::getDTO)
                        .toList())
                .total(this.getTotal())
                .build();
    }

}
