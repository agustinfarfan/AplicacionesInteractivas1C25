package com.uade.tpo.demo.controllers;

import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.dto.CarritoDTO;
import com.uade.tpo.demo.entity.dto.CartProductRequest;
import com.uade.tpo.demo.entity.dto.OrderRequest;
import com.uade.tpo.demo.service.OrderService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
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
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(OrderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> Order = OrderService.getOrderById(id);
        return Order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest OrderRequest) {
        Order Order = new Order();
        Order.setCantidad(OrderRequest.getCantidad());
        Order.setId(OrderRequest.getUserId());
        
        Order newOrder = OrderService.createOrder(Order);
        return ResponseEntity.created(URI.create("/Orders/" + newOrder.getId())).body(newOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        OrderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{orderId}/addProduct")
    public ResponseEntity<OrderRequest> addProductToCart(@PathVariable Long orderId, @RequestBody CartProductRequest request) {
        OrderRequest order = OrderService.addProductToOrder(orderId, request);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/removeProduct")
    public ResponseEntity<CarritoDTO> removeProductFromCart(
            @PathVariable Long orderId,
            @Valid @RequestBody CartProductRequest request) {

        CarritoDTO carrito = cartService.deleteProductFromCart(cartId, request);
        return ResponseEntity.ok(carrito);
    }


}


