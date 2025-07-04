package com.uade.tpo.demo.controllers;

import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.dto.OrderDTO;
import com.uade.tpo.demo.entity.dto.OrderRequest;
import com.uade.tpo.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("orders")
public class OrderController {

    @Autowired
    private OrderService OrderService;

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(OrderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        OrderDTO order = OrderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

//    @PostMapping
//    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest OrderRequest) {
//        Order Order = new Order();
//        Order.setCantidad(OrderRequest.getCantidad());
//        Order.setId(OrderRequest.getUserId());
//
//        Order newOrder = OrderService.createOrder(Order);
//        return ResponseEntity.created(URI.create("/Orders/" + newOrder.getId())).body(newOrder);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        OrderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}


