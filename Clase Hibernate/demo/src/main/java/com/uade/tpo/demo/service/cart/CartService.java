package com.uade.tpo.demo.service.cart;

import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.dto.CartProductRequest;
import com.uade.tpo.demo.entity.dto.CarritoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface CartService {


    public Page<CarritoDTO> getAllCarts(PageRequest pageable);
    public CarritoDTO getCartById(Long cartId);
    public Long createCart(String email);
    public CarritoDTO addProductToCart(Long cartId, CartProductRequest request);
    public CarritoDTO deleteProductFromCart(Long cartId, CartProductRequest request);
    public Boolean deleteCartById(Long cartId);
}
