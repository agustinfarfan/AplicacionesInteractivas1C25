package com.uade.tpo.demo.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razonSocial;

    private String cuil;

    private String calle;

    private int altura;

    private String codigoPostal;

    private String localidad;

    private String provincia;

    //@OneToMany
    //@JoinColumn(name = "usuario_id")
    //private Set<Usuario> usuarios;
}
