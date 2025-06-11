package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Cupon;
import com.uade.tpo.demo.entity.dto.CreateCuponRequest;
import com.uade.tpo.demo.entity.dto.CuponDTO;
import com.uade.tpo.demo.entity.dto.UserCreateDTO;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.CuponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CuponServiceImpl implements CuponService {

    @Autowired
    private CuponRepository cuponRepository;

    @Override
    public List<CuponDTO> obtenerTodos() {
        return cuponRepository.findAll().stream().map(Cupon::getDTO).toList();
    }

    @Override
    public CuponDTO obtenerPorId(Long id) {
        Cupon cupon = cuponRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Coupon not found with id: " + id));
        return cupon.getDTO();
    }

    @Override
    public CuponDTO crearCupon(CreateCuponRequest request) {
        return null;
    }

    @Override
    public CuponDTO actualizarCupon(Long id, CreateCuponRequest request) {
        return null;
    }
}
