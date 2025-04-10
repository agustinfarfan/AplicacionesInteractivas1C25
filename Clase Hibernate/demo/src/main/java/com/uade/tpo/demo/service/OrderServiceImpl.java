package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.CarritoDetalle;
import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.OrderDetails;
import com.uade.tpo.demo.entity.Producto;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.CartProductRequest;
import com.uade.tpo.demo.entity.dto.OrderRequest;
import com.uade.tpo.demo.enums.Role;
import com.uade.tpo.demo.exceptions.CartProductQuantityException;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.OrderDetailsRepository;
import com.uade.tpo.demo.repository.OrderRepository;
import com.uade.tpo.demo.repository.ProductRepository;
import com.uade.tpo.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository OrderRepository;

    @Autowired
    private ProductRepository productoRepository;

    @Autowired
    private UserRepository userRepository;

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

    @Override
    public OrderRequest addProductToOrder(Long orderId, CartProductRequest request) {
        Order order = OrderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Orden no encontrado con Id: " + orderId));
        Producto producto = productoRepository.findById(request.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con Id: " + request.getProductId()));;

        // Validacion de autenticacion
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (user.getRole() != Role.VENDOR && !Objects.equals(user.getId(), order.getUser().getId())) {
            throw new AccessDeniedException("User is not the owner of this cart.");
        }

        // Validacion de cantidad
        if (request.getCantidad() <= 0) {
            throw new CartProductQuantityException();
        }

        // Validacion de stock
        if (producto.getStock() < request.getCantidad()) {
            throw new CartProductQuantityException();
        }

        // Ver si tiene producto en carrito.
        List<OrderDetails> orderDetails = OrderDetailsRepository.findByOrderId(orderId);
        AtomicBoolean existe = new AtomicBoolean(false);

        orderDetails.forEach(carritoDetalle -> {
            if (carritoDetalle.tieneProducto(request.getProductId())) {

                carritoDetalle.ajustarCantidad(request.getCantidad());
                cartDetailsRepository.save(carritoDetalle);

                carrito.setExpirationDate(LocalDateTime.now().plusDays(30));
                cartRepository.save(carrito);

                existe.set(true);
            }
        });

        // Agregar carrito detalle al carrito si no existe.
        if (!existe.get()) {
            CarritoDetalle carritoDetalle = new CarritoDetalle(producto, request.getCantidad());
            carrito.agregarDetalle(carritoDetalle);
            carrito.setExpirationDate(LocalDateTime.now().plusDays(30));
            cartRepository.save(carrito);
        }

        return carrito.getDTO();
    }

    @Override
    public OrderRequest deleteProductFromOrder(Long orderId, CartProductRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteProductFromOrder'");
    }
}

