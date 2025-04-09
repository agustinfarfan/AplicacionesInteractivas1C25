package com.uade.tpo.demo.controllers;


import com.uade.tpo.demo.entity.dto.CartProductRequest;
import com.uade.tpo.demo.entity.dto.CarritoDTO;
import com.uade.tpo.demo.entity.dto.CreateCartRequest;
import com.uade.tpo.demo.service.cart.CartService;
import io.jsonwebtoken.Jwt;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/create")
    public ResponseEntity<Long> createCart() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Long carritoId = cartService.createCart(email);
        return ResponseEntity.ok(carritoId);
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<CarritoDTO> getCartById(@PathVariable Long cartId) {
        CarritoDTO result = cartService.getCartById(cartId);

        return ResponseEntity.ok(result);
    }

    @PutMapping("/{cartId}/addProduct")
    public ResponseEntity<CarritoDTO> addProductToCart(@PathVariable Long cartId, @RequestBody CartProductRequest request) {
        CarritoDTO carrito = cartService.addProductToCart(cartId, request);
        return ResponseEntity.ok(carrito);
    }

    @PutMapping("/{cartId}/removeProduct")
    public ResponseEntity<CarritoDTO> removeProductFromCart(
            @PathVariable Long cartId,
            @Valid @RequestBody CartProductRequest request) {

        CarritoDTO carrito = cartService.deleteProductFromCart(cartId, request);
        return ResponseEntity.ok(carrito);
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<String> deleteCart(@PathVariable Long cartId) {
        cartService.deleteCartById(cartId);
        return ResponseEntity.ok("Cart deleted succesfully.");
    }

}
