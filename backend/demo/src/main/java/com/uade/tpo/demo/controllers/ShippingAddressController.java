package com.uade.tpo.demo.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.uade.tpo.demo.entity.dto.ShippingAddressRequest;
import com.uade.tpo.demo.entity.dto.ShippingAddressDTO;
import com.uade.tpo.demo.service.ShippingAddressService;

import java.util.List;

@RestController
@RequestMapping("/shipping-addresses")
public class ShippingAddressController {

    @Autowired
    private ShippingAddressService service;

    /** Listar todas las direcciones de un usuario **/
    @GetMapping("/user/{userId}")
    public List<ShippingAddressDTO> listByUser(@PathVariable Long userId) {
        return service.listByUser(userId);
    }

    /** Crear una nueva dirección para un usuario **/
    @PostMapping("/user/{userId}")
    public ShippingAddressDTO create(
        @PathVariable Long userId,
        @RequestBody ShippingAddressRequest req
    ) {
        return service.create(userId, req);
    }

    /** Modificar una dirección existente **/
    @PutMapping("/{id}")
    public ShippingAddressDTO update(
        @PathVariable Long id,
        @RequestBody ShippingAddressRequest req
    ) {
        return service.update(id, req);
    }

    /** Eliminar **/
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
