package com.uade.tpo.demo.controllers.auth;

import com.uade.tpo.demo.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;
    // 
    private String razonSocial;
    private String cuil;
//    private String calle;
//    private Integer altura;
//    private String codigoPostal;
//    private String localidad;
//    private String provincia;
}
