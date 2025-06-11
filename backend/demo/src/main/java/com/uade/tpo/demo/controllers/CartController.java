package com.uade.tpo.demo.controllers;


import com.uade.tpo.demo.entity.dto.*;
import com.uade.tpo.demo.service.cart.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user/{id}/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<Long> createCart() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Long carritoId = cartService.createCart(email);
        return ResponseEntity.ok(carritoId);
    }

    @GetMapping
    public ResponseEntity<CarritoDTO> getCart(@PathVariable("id") Long userId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        CarritoDTO result = cartService.getCartByEmail(userId, email);

        return ResponseEntity.ok(result);
    }

    @PutMapping("/addProduct")
    public ResponseEntity<CarritoDTO> addProductToCart(@PathVariable("id") Long userId, @RequestBody CartProductRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        CarritoDTO carrito = cartService.addProductToCart(userId, email, request);
        return ResponseEntity.ok(carrito);
    }

    @PutMapping("/removeProduct")
    public ResponseEntity<CarritoDTO> removeProductFromCart(
            @PathVariable("id") Long userId,
            @Valid @RequestBody CartProductRequest request) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        CarritoDTO carrito = cartService.deleteProductFromCart(userId, email, request);
        return ResponseEntity.ok(carrito);
    }

    @PutMapping("/addCoupon")
    public ResponseEntity<CarritoDTO> addCouponToCart(@PathVariable("id") Long userId, @RequestBody CartCouponRequest request) {
        System.out.println(userId);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        CarritoDTO carrito = cartService.addCouponToCart(userId, email, request);
        return ResponseEntity.ok(carrito);
    }

    @PostMapping("/finalize")
    public ResponseEntity<OrderDTO> finalizeCart(@PathVariable("id") Long userId, @RequestBody CheckoutDTO requestBody) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        OrderDTO orden = cartService.finalizeCart(userId, email, requestBody);
        return ResponseEntity.ok(orden);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteCart() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        cartService.createCart(email);
        return ResponseEntity.ok("Cart deleted succesfully.");
    }

}
