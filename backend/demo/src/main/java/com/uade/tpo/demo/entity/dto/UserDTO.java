package com.uade.tpo.demo.entity.dto;

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
}
