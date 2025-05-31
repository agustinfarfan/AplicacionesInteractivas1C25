package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository OrderRepository;

    @Override
    public List<Order> getAllOrders() {
        return OrderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return OrderRepository.findById(id);
    }

    @Override
    public Order createOrder(Order Order) {
        return OrderRepository.save(Order);
    }

    @Override
    public void deleteOrder(Long id) {
        OrderRepository.deleteById(id);
    }
}

