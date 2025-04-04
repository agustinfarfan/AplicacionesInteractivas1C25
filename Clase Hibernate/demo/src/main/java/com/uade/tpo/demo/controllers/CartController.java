package com.uade.tpo.demo.controllers;


import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.Categoria;
import com.uade.tpo.demo.entity.Producto;
import com.uade.tpo.demo.entity.dto.AddProductRequest;
import com.uade.tpo.demo.entity.dto.CreateCartRequest;
import com.uade.tpo.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<Carrito> addProductToCart(@PathVariable Long cartId, @RequestBody AddProductRequest request) {
        Carrito carrito = cartService.addProductToCart(cartId, request);

        return ResponseEntity.ok(carrito);
    }

    @PostMapping("/{cartId}/removeProduct")
    public ResponseEntity<Page<Categoria>> removeProductFromCart(@PathVariable Long cartId, Producto producto) {

        cartService.rem

    }

}
