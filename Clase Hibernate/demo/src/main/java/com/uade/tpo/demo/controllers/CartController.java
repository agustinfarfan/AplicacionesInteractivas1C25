package com.uade.tpo.demo.controllers;


import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.dto.AddProductRequest;
import com.uade.tpo.demo.entity.dto.CreateCartRequest;
import com.uade.tpo.demo.exceptions.CartProductQuantityException;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/create")
    public ResponseEntity<Long> createCart(@RequestBody CreateCartRequest request) {

        Long carritoId = cartService.createCart(request.getUserId());

        return ResponseEntity.ok(carritoId);
    }

    @PostMapping("/{cartId}/addProduct")
    public ResponseEntity<Carrito> addProductToCart(@PathVariable Long cartId, @RequestBody AddProductRequest request) throws
            CartProductQuantityException,
            ResourceNotFoundException
            {
        Carrito carrito = cartService.addProductToCart(cartId, request);

        return ResponseEntity.ok(carrito);
    }

    @PostMapping("/{cartId}/removeProduct")
    public ResponseEntity<Carrito> removeProductFromCart(@PathVariable Long cartId, @RequestBody Long productoId) {

        Carrito carrito = cartService.deleteProductFromCart(cartId, productoId);

        return ResponseEntity.ok(carrito);
    }

}
