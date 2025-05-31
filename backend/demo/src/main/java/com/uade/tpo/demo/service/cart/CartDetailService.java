package com.uade.tpo.demo.service.cart;

import com.uade.tpo.demo.entity.CarritoDetalle;

import java.util.List;

public interface CartDetailService {

    public List<CarritoDetalle> getCartDetailsFromCartId(Long carritoId);
}
