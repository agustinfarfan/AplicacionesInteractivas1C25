package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.dto.CreateCuponRequest;
import com.uade.tpo.demo.entity.dto.CuponDTO;
import com.uade.tpo.demo.entity.dto.UserCreateDTO;
import com.uade.tpo.demo.entity.dto.UserDTO;

import java.util.List;

public interface CuponService {

    List<CuponDTO> obtenerTodos();

    CuponDTO obtenerPorId(Long id);

    CuponDTO crearCupon(CreateCuponRequest request);

    CuponDTO actualizarCupon(Long id, CreateCuponRequest request);

}
