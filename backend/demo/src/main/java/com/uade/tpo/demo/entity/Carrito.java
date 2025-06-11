package com.uade.tpo.demo.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.uade.tpo.demo.entity.dto.CarritoDTO;
import com.uade.tpo.demo.enums.EstadoCarrito;
import com.uade.tpo.demo.enums.TipoDescuento;
import jakarta.annotation.Nullable;
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

    public Carrito() {
    }

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

    @Nullable
    @ManyToOne
    @JoinColumn(name = "cupon_id", nullable = true)
    private Cupon cupon;

    public void agregarDetalle(CarritoDetalle carritoDetalle) {
        this.carritoDetalle.add(carritoDetalle);
        carritoDetalle.setCarrito(this);
    }

    public double getDescuento() {

        if (cupon == null) {
            return 0;
        }

        if (cupon.getTipoDescuento().equals(TipoDescuento.FIJO)) {
            return cupon.getDescuento();
        } else {
            return (cupon.getDescuento() / 100) * getSumaTotalProductos();
        }
    }

    public double getSumaTotalProductos() {
        return carritoDetalle.stream().mapToDouble(CarritoDetalle::obtenerSubTotal).sum();
    }

    public double getTotal() {
        return getSumaTotalProductos() - getDescuento();
    }

    public CarritoDTO getDTO() {
        return CarritoDTO.builder()
            .carritoDetalle(this.carritoDetalle.stream()
                .map(CarritoDetalle::getDTO)
                .toList())
            .descuento(getDescuento())
            .total(this.getTotal())
            .build();
    }

}
