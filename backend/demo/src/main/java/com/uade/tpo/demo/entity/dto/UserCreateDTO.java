package com.uade.tpo.demo.entity.dto;

import com.uade.tpo.demo.enums.Role;
import lombok.Getter;

@Getter
public class UserCreateDTO {
    private String email;
    private String first_name;
    private String last_name;
    private Role role;
}
