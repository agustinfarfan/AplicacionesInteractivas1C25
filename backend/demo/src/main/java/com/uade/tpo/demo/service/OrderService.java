package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.dto.CheckoutDTO;
import com.uade.tpo.demo.entity.dto.OrderDTO;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    public List<OrderDTO> getAllOrders();

    public OrderDTO getOrderById(Long id);

    public List<OrderDTO> getOrdersByUserId(Long id, String email);

    public OrderDTO createOrder(Carrito carrito, CheckoutDTO requestBody);

    public void deleteOrder(Long id);
}