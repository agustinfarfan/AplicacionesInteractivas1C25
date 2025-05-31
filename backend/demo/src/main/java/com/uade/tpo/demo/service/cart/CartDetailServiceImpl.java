package com.uade.tpo.demo.service.cart;

import com.uade.tpo.demo.entity.CarritoDetalle;
import com.uade.tpo.demo.repository.CartDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailServiceImpl implements CartDetailService {

    @Autowired
    private CartDetailsRepository cartDetailsRepository;

    public List<CarritoDetalle> getCartDetailsFromCartId(Long carritoId) {
        return cartDetailsRepository.findByCartId(carritoId);
    }

}
