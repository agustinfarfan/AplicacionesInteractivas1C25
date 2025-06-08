package com.uade.tpo.demo.entity;

import com.uade.tpo.demo.entity.dto.CarritoDTO;
import com.uade.tpo.demo.entity.dto.OrderDTO;
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

    public Order(User user, Double total) {
        this.user = user;
        this.total = total;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Double total;

    private String metodoDeEnvio;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DetalleOrder> orderDetalle = new HashSet<DetalleOrder>();



    public OrderDTO getDTO() {
        return OrderDTO.builder()
                .userId(user.getId())
                .detalleOrder(this.orderDetalle.stream()
                        .map(DetalleOrder::getDTO)
                        .toList())
                .total(this.total)
                .build();
    }

}
