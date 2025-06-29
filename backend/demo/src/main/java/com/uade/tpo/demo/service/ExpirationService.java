package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.repository.CartRepository;
import com.uade.tpo.demo.service.cart.CartService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExpirationService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartService cartService;

    @Scheduled(cron = "0 0 0 * * *")
    public void deleteExpiredCarts() {
        runCartExpiration();
    }

    @Transactional
    public void runCartExpiration() {
        List<Carrito> carritos = cartRepository.findAllByExpirationDateBefore(LocalDateTime.now());

        for (Carrito carrito : carritos) {
            cartService.createCart(carrito.getUser().getEmail());
        }
    }

}
