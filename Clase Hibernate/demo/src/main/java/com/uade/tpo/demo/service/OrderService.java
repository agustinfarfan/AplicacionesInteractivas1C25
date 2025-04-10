package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.dto.CarritoDTO;
import com.uade.tpo.demo.entity.dto.CartProductRequest;
import com.uade.tpo.demo.entity.dto.OrderRequest;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    public List<Order> getAllOrders();

    public Optional<Order> getOrderById(Long id);

    public Order createOrder(Order Order);

    public OrderRequest addProductToOrder(Long orderId, CartProductRequest request);
    public OrderRequest deleteProductFromOrder(Long orderId, CartProductRequest request);
    
    public void deleteOrder(Long id);
}