package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.DetalleOrder;
import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.dto.OrderDTO;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.DetalleOrderRepository;
import com.uade.tpo.demo.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private DetalleOrderRepository detalleOrderRepository;

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream().map(Order::getDTO).toList();
    }

    @Override
    public OrderDTO getOrderById(Long id) {

        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No se encontró order con id: " + id));

        return order.getDTO();
    }

    @Override
    @Transactional
    public OrderDTO createOrder(Carrito carrito) {

        Order order = new Order(carrito.getUser(), carrito.getTotal());

        Order savedOrder = orderRepository.save(order);

        carrito.getCarritoDetalle().forEach(carritoDetalle -> {

            DetalleOrder detalleOrder = new DetalleOrder(
                    carritoDetalle.getCantidad(),
                    carritoDetalle.obtenerSubTotal(),
                    savedOrder,
                    carritoDetalle.getProducto()
            );

            detalleOrderRepository.save(detalleOrder);
        });

        Order updatedOrder = orderRepository.save(savedOrder);

        return updatedOrder.getDTO();
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}

