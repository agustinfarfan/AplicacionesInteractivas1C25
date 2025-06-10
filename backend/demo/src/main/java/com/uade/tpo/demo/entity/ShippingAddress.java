package com.uade.tpo.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "shipping_address")
@Getter 
@Setter
@Builder
public class ShippingAddress {

    public ShippingAddress() {
    }

    public ShippingAddress(Long id, String alias, String calle, Integer altura, String codigoPostal, String localidad, String provincia, User user) {
        this.id = id;
        this.alias = alias;
        this.calle = calle;
        this.altura = altura;
        this.codigoPostal = codigoPostal;
        this.localidad = localidad;
        this.provincia = provincia;
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nombre descriptivo que el usuario elija (p.ej. “Oficina central”) **/
    @Column(name = "alias", nullable = false)
    private String alias;

    @Column(name = "calle", nullable = false)
    private String calle;

    @Column(name = "altura", nullable = false)
    private Integer altura;

    @Column(name = "codigo_postal", nullable = false)
    private String codigoPostal;

    @Column(name = "localidad", nullable = false)
    private String localidad;

    @Column(name = "provincia", nullable = false)
    private String provincia;

    /** Relación muchos→uno con el usuario */
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
