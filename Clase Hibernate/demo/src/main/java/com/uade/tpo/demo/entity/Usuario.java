package com.uade.tpo.demo.entity;

import java.util.List;

import com.uade.tpo.demo.enums.TipoUsuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Entity
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String apellido;

    private String email;

    private String password;

    private TipoUsuario tipoUsuario;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @Min(0)
    @Max(10)
    private int nivelPermiso;

}
