package com.uade.tpo.demo.service.cart;


import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.CarritoDetalle;
import com.uade.tpo.demo.entity.Producto;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.CartProductRequest;
import com.uade.tpo.demo.entity.dto.CarritoDTO;
import com.uade.tpo.demo.enums.Role;
import com.uade.tpo.demo.exceptions.CartProductQuantityException;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.CartDetailsRepository;
import com.uade.tpo.demo.repository.CartRepository;
import com.uade.tpo.demo.repository.ProductoRepository;
import com.uade.tpo.demo.repository.UserRepository;
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

    public Page<CarritoDTO> getAllCarts(PageRequest pageable) {
        Page<CarritoDTO> carritoDTOs = cartRepository.findAll(pageable).map(Carrito::getDTO);
        return carritoDTOs;
    }

    public CarritoDTO getCartById(Long cartId) {
        Carrito carrito = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con Id: " + cartId));
        return carrito.getDTO();
    }

    @Transactional
    public Long createCart(String email) {

        User user = UserRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        Optional<Carrito> carritoViejo = cartRepository.findByUserId(user.getId());

        // Si User tenia carrito creado, lo elimina.
        if (carritoViejo.isPresent()) {
            cartRepository.delete(carritoViejo.get());
        }

        Carrito carrito = cartRepository.save(new Carrito(user));

        return carrito.getId();
    }

    @Transactional
    public CarritoDTO addProductToCart(Long cartId, CartProductRequest request) throws CartProductQuantityException, ResourceNotFoundException {

        Carrito carrito = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con Id: " + cartId));
        Producto producto = productoRepository.findById(request.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con Id: " + request.getProductId()));;

        // Validacion de autenticacion
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (user.getRole() != Role.VENDOR && !Objects.equals(user.getId(), carrito.getUser().getId())) {
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
        List<CarritoDetalle> carritoDetalles = cartDetailsRepository.findByCartId(cartId);
        AtomicBoolean existe = new AtomicBoolean(false);

        carritoDetalles.forEach(carritoDetalle -> {
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

    @Transactional
    public CarritoDTO deleteProductFromCart(Long cartId, CartProductRequest request) throws ResourceNotFoundException {
        Carrito carrito = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con Id: " + cartId));
        Producto producto = productoRepository.findById(request.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con Id: " + request.getProductId()));;

        // Validacion de autenticacion
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (user.getRole() != Role.VENDOR && !Objects.equals(user.getId(), carrito.getUser().getId())) {
            throw new AccessDeniedException("User is not the owner of this cart.");
        }

        List<CarritoDetalle> carritoDetalles = cartDetailsRepository.findByCartId(cartId);
        AtomicBoolean existe = new AtomicBoolean(false);

        carritoDetalles.forEach(carritoDetalle -> {
            if (carritoDetalle.tieneProducto(request.getProductId())) {

                if (carritoDetalle.getCantidad() < request.getCantidad().intValue()) {
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
    public Boolean deleteCartById(Long cartId) {

        Carrito carrito = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        // Validacion de autenticacion
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (user.getRole() != Role.VENDOR && !Objects.equals(user.getId(), carrito.getUser().getId())) {
            throw new AccessDeniedException("User is not the owner of this cart.");
        }

        cartRepository.deleteById(cartId);
        return true;
    }

}
