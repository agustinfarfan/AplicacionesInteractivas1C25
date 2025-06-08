package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.dto.OrderDTO;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    public List<OrderDTO> getAllOrders();

    public OrderDTO getOrderById(Long id);

    public OrderDTO createOrder(Carrito carrito);

    public void deleteOrder(Long id);
}