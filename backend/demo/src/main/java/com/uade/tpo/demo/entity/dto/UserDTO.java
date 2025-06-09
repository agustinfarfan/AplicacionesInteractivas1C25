package com.uade.tpo.demo.entity.dto;

import java.util.List;

import com.uade.tpo.demo.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserDTO {
    private Long user_id;
    private String email;
    private String first_name;
    private String last_name;
    private Role role;
    private String razonSocial;
    private List<ShippingAddressDTO> direcciones;
}
