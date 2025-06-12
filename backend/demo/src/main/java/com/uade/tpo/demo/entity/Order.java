package com.uade.tpo.demo.entity;

import com.uade.tpo.demo.entity.dto.CarritoDTO;
import com.uade.tpo.demo.entity.dto.OrderDTO;
import com.uade.tpo.demo.enums.EstadoOrder;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "sales_order")
public class Order {

    public Order() {
    }

    public Order(User user, Double total, String metodoDeEnvio, String direccion, Long ultimosCuatroDigitos, String nombre, String apellido, String email) {
        this.user = user;
        this.total = total;
        this.metodoDeEnvio = metodoDeEnvio;
        this.direccion = direccion;
        this.ultimosCuatroDigitos = ultimosCuatroDigitos;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        estado = EstadoOrder.CREADO;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Double total;

    @Column
    private String metodoDeEnvio;

    @Column
    private String direccion;

    @Column(name = "ultimos_cuatro_digitos")
    private Long ultimosCuatroDigitos;

    @Column
    private String nombre;

    @Column
    private String apellido;

    @Column
    private String email;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "cupon_id")
    private Cupon cupon;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DetalleOrder> orderDetalle = new HashSet<DetalleOrder>();

    @Column
    private EstadoOrder estado;

    public OrderDTO getDTO() {
       return OrderDTO.builder()
            .orderId(id)
            .userId(user.getId())
            .detalleOrder(this.orderDetalle.stream()
                .map(DetalleOrder::getDTO)
                .toList())
            .total(this.total)
            .createdAt(createdAt)
            .estado(estado)
            .metodoDeEnvio(metodoDeEnvio)
            .direccion(direccion)
            .ultimosCuatroDigitos(ultimosCuatroDigitos)
            .nombre(nombre)
            .apellido(apellido)
            .email(email)
            .cupon(cupon != null ? cupon.getDTO() : null)
            .build();
    }

}
