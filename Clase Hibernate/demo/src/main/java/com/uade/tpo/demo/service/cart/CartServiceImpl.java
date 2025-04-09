package com.uade.tpo.demo.service.cart;


import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.CarritoDetalle;
import com.uade.tpo.demo.entity.Producto;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.CartProductRequest;
import com.uade.tpo.demo.entity.dto.CarritoDTO;
import com.uade.tpo.demo.exceptions.CartProductQuantityException;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.CartDetailsRepository;
import com.uade.tpo.demo.repository.CartRepository;
import com.uade.tpo.demo.repository.ProductoRepository;
import com.uade.tpo.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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

    public Page<CarritoDTO> getAllCarts(PageRequest pageable) {
        Page<CarritoDTO> carritoDTOs = cartRepository.findAll(pageable).map(Carrito::getDTO);
        return carritoDTOs;
    }

    public CarritoDTO getCartById(Long cartId) {
        Carrito carrito = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con Id: " + cartId));
        return carrito.getDTO();
    }

    @Transactional
    public Long createCart(Long userId) {

        User User = UserRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User no encontrado con id: " + userId));

        Optional<Carrito> carritoViejo = cartRepository.findByUserId(userId);

        // Si User tenia carrito creado, lo elimina.
        if (carritoViejo.isPresent()) {
            cartRepository.delete(carritoViejo.get());
        }

        Carrito carrito = cartRepository.save(new Carrito(User));

        return carrito.getId();
    }

    @Transactional
    public CarritoDTO addProductToCart(Long cartId, CartProductRequest request) throws CartProductQuantityException, ResourceNotFoundException {

        Carrito carrito = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con Id: " + cartId));

        // Eliminar cuando haya clase en productoService
        Producto producto = productoRepository.findById(request.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con Id: " + request.getProductId()));;

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

        // Eliminar cuando haya clase en productoService
        Producto producto = productoRepository
                .findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con Id: " + request.getProductId()));;

        List<CarritoDetalle> carritoDetalles = cartDetailsRepository.findByCartId(cartId);
        AtomicBoolean existe = new AtomicBoolean(false);

        carritoDetalles.forEach(carritoDetalle -> {
            if (carritoDetalle.tieneProducto(request.getProductId())) {

                if (carritoDetalle.getCantidad() < request.getCantidad().intValue()) {
                    cartDetailsRepository.delete(carritoDetalle);
                    carrito.getCarritoDetalle().remove(carritoDetalle);
                } else {
                    carritoDetalle.ajustarCantidad(-request.getCantidad());
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
        cartRepository.deleteById(cartId);
        return true;
    }

}
