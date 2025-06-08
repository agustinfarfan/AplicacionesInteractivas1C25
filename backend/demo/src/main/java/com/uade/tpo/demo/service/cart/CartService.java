package com.uade.tpo.demo.service.cart;

import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.dto.CartProductRequest;
import com.uade.tpo.demo.entity.dto.CarritoDTO;
import com.uade.tpo.demo.entity.dto.OrderDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface CartService {


    public Page<CarritoDTO> getAllCarts(PageRequest pageable);
    public CarritoDTO getCartByEmail(Long userId, String email);
    public Long createCart(String email);
    public CarritoDTO addProductToCart(Long userId, String email, CartProductRequest request);
    public CarritoDTO deleteProductFromCart(Long userId, String email, CartProductRequest request);
    public Boolean deleteCartById(Long userId, String email);
    public OrderDTO finalizeCart(Long userId, String email);
}
