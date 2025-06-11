package com.uade.tpo.demo.service.cart;


import com.uade.tpo.demo.entity.*;
import com.uade.tpo.demo.entity.dto.*;
import com.uade.tpo.demo.enums.Role;
import com.uade.tpo.demo.exceptions.CartProductQuantityException;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.*;
import com.uade.tpo.demo.service.OrderService;
import com.uade.tpo.demo.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository UserRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private CartDetailsRepository cartDetailsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderService orderService;
    @Autowired
    private CuponRepository cuponRepository;

    public Page<CarritoDTO> getAllCarts(PageRequest pageable) {
        return cartRepository.findAll(pageable).map(Carrito::getDTO);
    }

    public CarritoDTO getCartByEmail(Long userId, String email) {

        User user = UserRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        Carrito carrito = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con UserId: " + userId));

        if (!carrito.getUser().getEmail().equals(email)) {
            throw new AccessDeniedException("Email no coincide con dueño del carrito");
        }

        return carrito.getDTO();
    }

    @Transactional
    public Long createCart(String email) {

        User user = UserRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        Optional<Carrito> carritoViejo = cartRepository.findByUserId(user.getId());

        // Si User tenia carrito creado, lo elimina.
        carritoViejo.ifPresent(carrito -> cartRepository.delete(carrito));

        Carrito carrito = cartRepository.save(new Carrito(user));

        return carrito.getId();
    }

    @Transactional
    public CarritoDTO addProductToCart(Long userId, String email, CartProductRequest request) throws CartProductQuantityException, ResourceNotFoundException {

        Producto producto = productoRepository.findById(request.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con Id: " + request.getProductId()));;
        User user = UserRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        Carrito carrito = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con UserId: " + userId));

        // Validación de propiedad de carrito
        if (!carrito.getUser().getEmail().equals(email) ) {
            throw new AccessDeniedException("Email no coincide con dueño del carrito");
        }

        // Validacion de cantidad
        if (request.getCantidad() <= 0) {
            throw new CartProductQuantityException("No se puede ingresar cantidad negativa.");
        }

        // Validacion de stock
        if (producto.getStock() < request.getCantidad()) {
            throw new IllegalArgumentException("El producto no tiene stock");
        }

        // Ver si tiene producto en carrito.
        List<CarritoDetalle> carritoDetalles = cartDetailsRepository.findByCartId(carrito.getId());
        AtomicBoolean existe = new AtomicBoolean(false);

        carritoDetalles.forEach(carritoDetalle -> {
            if (carritoDetalle.tieneProducto(request.getProductId())) {

                if (producto.getStock() < request.getCantidad() + carritoDetalle.getCantidad()) {
                    throw new IllegalArgumentException("El producto no tiene stock");
                }

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
    @Transactional
    public CarritoDTO addCouponToCart(Long userId, String email, CartCouponRequest request) {
        Cupon cupon = cuponRepository.findByNombre(request.getNombreCupon()).orElseThrow(() -> new ResourceNotFoundException("Coupon not found with name: " + request.getNombreCupon()));;
        User user = UserRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userId));
        Carrito carrito = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con UserId: " + userId));

        // Validación de propiedad de carrito
        if (!carrito.getUser().getEmail().equals(email) ) {
            throw new AccessDeniedException("Email no coincide con dueño del carrito");
        }

        carrito.setCupon(cupon);

        Carrito savedCarrito = cartRepository.save(carrito);

        return savedCarrito.getDTO();
    }

    @Transactional
    public CarritoDTO deleteProductFromCart(Long userId, String email, CartProductRequest request) throws ResourceNotFoundException {

        Producto producto = productoRepository.findById(request.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con Id: " + request.getProductId()));;
        User user = UserRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        Carrito carrito = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con UserId: " + userId));

        // Validación de propiedad de carrito
        if (!carrito.getUser().getEmail().equals(email) ) {
            throw new AccessDeniedException("Email no coincide con dueño del carrito");
        }

        List<CarritoDetalle> carritoDetalles = cartDetailsRepository.findByCartId(carrito.getId());
        AtomicBoolean existe = new AtomicBoolean(false);

        carritoDetalles.forEach(carritoDetalle -> {
            if (carritoDetalle.tieneProducto(request.getProductId())) {

                if (carritoDetalle.getCantidad() <= request.getCantidad().intValue()) {
                    cartDetailsRepository.delete(carritoDetalle);
                    carrito.getCarritoDetalle().remove(carritoDetalle);
                } else {
                    carritoDetalle.ajustarCantidad(-Math.abs(request.getCantidad()));
                    cartDetailsRepository.save(carritoDetalle);
                }

                existe.set(true);
            }
        });

        if (!existe.get()) {
            throw new ResourceNotFoundException("Producto dado no existe en carrito.");
        }

        carrito.setExpirationDate(LocalDateTime.now().plusDays(30));
        cartRepository.save(carrito);

        return carrito.getDTO();
    }

    @Transactional
    public Boolean deleteCartById(Long userId, String email) {

        User user = UserRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        Carrito carrito = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con UserId: " + userId));

        // Validación de propiedad de carrito
        if (!carrito.getUser().getEmail().equals(email) ) {
            throw new AccessDeniedException("Email no coincide con dueño del carrito");
        }

        cartRepository.deleteById(carrito.getId());
        return true;
    }

    @Transactional
    public OrderDTO finalizeCart(Long userId, String email, CheckoutDTO requestBody) {

        User user = UserRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        Carrito carrito = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con UserId: " + userId));

        // Validación de propiedad de carrito
        if (!carrito.getUser().getEmail().equals(email) ) {
            throw new AccessDeniedException("Email no coincide con dueño del carrito");
        }

        // Validacion de cantidad de productos
        if (carrito.getCarritoDetalle().isEmpty()) {
            throw new CartProductQuantityException("No se puede finalizar carrito sin productos");
        }

        OrderDTO orderDTO = orderService.createOrder(carrito, requestBody);

        createCart(email);

        return orderDTO;
    }
}
