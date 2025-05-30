package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Order;
import java.util.List;
import java.util.Optional;

public interface OrderService {
    public List<Order> getAllOrders();

    public Optional<Order> getOrderById(Long id);

    public Order createOrder(Order Order);
    
    public void deleteOrder(Long id);
}