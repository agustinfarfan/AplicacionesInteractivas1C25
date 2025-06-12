package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.*;
import com.uade.tpo.demo.entity.dto.CheckoutDTO;
import com.uade.tpo.demo.entity.dto.OrderDTO;
import com.uade.tpo.demo.enums.Role;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.DetalleOrderRepository;
import com.uade.tpo.demo.repository.OrderRepository;
import com.uade.tpo.demo.repository.ProductRepository;
import com.uade.tpo.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream().map(Order::getDTO).toList();
    }

    @Override
    public OrderDTO getOrderById(Long id) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("No se encontró order con email: " + email));

        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No se encontró order con id: " + id));

        if (!order.getUser().getEmail().equals(email) && !user.getRole().equals(Role.VENDOR)) {
            throw new AccessDeniedException("No coincide mail de user con orden.");
        }

        return order.getDTO();
    }

    @Override
    public List<OrderDTO> getOrdersByUserId(Long id, String email) {

        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No se encontró user con id: " + id));

        if (!user.getEmail().equals(email)) {
            throw new AccessDeniedException("No coincide email con id del usuario.");
        }

        return orderRepository.findByUserId(id).stream().map(Order::getDTO).toList();
    }

    @Override
    @Transactional
    public OrderDTO createOrder(Carrito carrito, CheckoutDTO requestBody) {

        Order order = new Order(
            carrito.getUser(),
            carrito.getTotal(),
            requestBody.getMetodoDeEnvio(),
            requestBody.getDireccion(),
            requestBody.getUltimosCuatroDigitos(),
            requestBody.getNombre(),
            requestBody.getApellido(),
            requestBody.getEmail()
        );

        if (carrito.getCupon() != null) {
            order.setCupon(carrito.getCupon());
        }

        Order savedOrder = orderRepository.save(order);

        carrito.getCarritoDetalle().forEach(carritoDetalle -> {

            Producto producto = carritoDetalle.getProducto();

            // Se descuenta Stock
            if (producto.getStock() >= carritoDetalle.getCantidad()) {
                producto.setStock(producto.getStock() - carritoDetalle.getCantidad());
            }

            // Se crea detalleOrder
            DetalleOrder detalleOrder = new DetalleOrder(
                    carritoDetalle.getCantidad(),
                    carritoDetalle.obtenerSubTotal(),
                    savedOrder,
                    producto
            );

            detalleOrderRepository.save(detalleOrder);
            productRepository.save(producto);

        });

        Order updatedOrder = orderRepository.save(savedOrder);

        return updatedOrder.getDTO();
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}

