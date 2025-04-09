package com.uade.tpo.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name = "cliente", uniqueConstraints = @UniqueConstraint(columnNames = "cuil"))
public class Cliente {

    public Cliente() {
    }

    public Cliente(String razonSocial, String cuil){
        this.razonSocial = razonSocial;
        this.cuil = cuil;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razonSocial;

    private String cuil;

    private String calle;

    private String altura;

    private String codigoPostal;

    private String localidad;

    private String provincia;

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    private List<User> Users;
}
