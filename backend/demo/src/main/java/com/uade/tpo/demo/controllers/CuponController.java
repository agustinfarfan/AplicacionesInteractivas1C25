package com.uade.tpo.demo.controllers;


import com.uade.tpo.demo.entity.dto.CreateCuponRequest;
import com.uade.tpo.demo.entity.dto.CuponDTO;
import com.uade.tpo.demo.entity.dto.UserCreateDTO;
import com.uade.tpo.demo.entity.dto.UserDTO;
import com.uade.tpo.demo.service.CuponService;
import com.uade.tpo.demo.service.OrderService;
import com.uade.tpo.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("coupon")
public class CuponController {

    @Autowired
    private CuponService cuponService;

    @GetMapping
    public ResponseEntity<List<CuponDTO>> obtenerTodos() {
        return ResponseEntity.ok(cuponService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CuponDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(cuponService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<CuponDTO> crearCupon(@RequestBody CreateCuponRequest request) {
        return ResponseEntity.ok(cuponService.crearCupon(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CuponDTO> actualizarCupon(@PathVariable Long id, @RequestBody CreateCuponRequest request) {
        return ResponseEntity.ok(cuponService.actualizarCupon(id, request));
    }

}
