package com.uade.tpo.demo.service.cart;

import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.dto.AddProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.Optional;

public interface CartService {


    public Page<Carrito> getAllCarts(PageRequest pageable);
    public Optional<Carrito> getCartById(Long cartId);
    public Long createCart(Long userId);
    public Carrito addProductToCart(Long cartId, AddProductRequest request);
    public Carrito deleteProductFromCart(Long cartId, Long productId);

}
