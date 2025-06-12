package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Cupon;
import com.uade.tpo.demo.entity.dto.CreateCuponRequest;
import com.uade.tpo.demo.entity.dto.CuponDTO;
import com.uade.tpo.demo.entity.dto.UserCreateDTO;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.CuponRepository;
import jakarta.transaction.Transactional;
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
    @Transactional
    public CuponDTO crearCupon(CreateCuponRequest request) {
        Cupon cupon = new Cupon(request);
        return cuponRepository.save(cupon).getDTO();
    }

    @Override
    public CuponDTO actualizarCupon(Long id, CreateCuponRequest request) {

        Cupon cupon = cuponRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Coupon not found with id: " + id));
        cupon.setNombre(request.getNombre());
        cupon.setDescuento(request.getDescuento());
        cupon.setCantidadUsos(request.getCantidadUsos());
        cupon.setTipoDescuento(request.getTipoDescuento());

        return cuponRepository.save(cupon).getDTO();
    }
}
