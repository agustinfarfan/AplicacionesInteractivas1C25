package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.UserCreateDTO;
import com.uade.tpo.demo.entity.dto.UserDTO;

import java.util.List;

public interface UserService {
    List<UserDTO> obtenerTodos();
    UserDTO obtenerPorId(Long id);
    UserDTO actualizarUser(Long id, UserCreateDTO request);
}
