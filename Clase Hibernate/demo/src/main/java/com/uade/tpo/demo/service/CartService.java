package com.uade.tpo.demo.service;


import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.CarritoDetalle;
import com.uade.tpo.demo.entity.Producto;
import com.uade.tpo.demo.entity.Usuario;
import com.uade.tpo.demo.entity.dto.AddProductRequest;
import com.uade.tpo.demo.exceptions.CartProductQuantityException;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.CartDetailsRepository;
import com.uade.tpo.demo.repository.CartRepository;
import com.uade.tpo.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartDetailsRepository cartDetailsRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProductoRepository productoRepository;

    public Page<Carrito> getAllCarts(PageRequest pageable) {
        return cartRepository.findAll(pageable);
    }

    public Optional<Carrito> getCartById(Long cartId) {
        return cartRepository.findById(cartId);
    }

    public Long createCart(Long userId) {

        Usuario usuario = usuarioRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Carrito carrito = cartRepository.save(new Carrito(usuario));

        return carrito.getId();
    }

    public Carrito addProductToCart(Long cartId, AddProductRequest request) throws CartProductQuantityException, CartProductQuantityException {

        Carrito carrito = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con Id: " + cartId));
        Producto producto = productoRepository.getById(request.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con Id: " + request.getProductId()));

        // Quantity Validation
        if (request.getCantidad() <= 0) {
            throw new CartProductQuantityException();
        }

        // Stock validation
        if (producto.getStock() < request.getCantidad()) {
            throw new CartProductQuantityException();
        }

        // See if Cart already has CartDetail with product
        List<CarritoDetalle> carritoDetalles = carrito.getCarritoDetalle();
        AtomicBoolean existe = new AtomicBoolean(false);

        carritoDetalles.forEach(carritoDetalle -> {
            if (carritoDetalle.getProducto().getId().equals(request.getProductId())) {
                carritoDetalle.setCantidad(carritoDetalle.getCantidad() + request.getCantidad());
                existe.set(true);
            }
        });

        if (!existe.get()) {
            cartDetailsRepository.save(new CarritoDetalle(carrito, producto, request.getCantidad()));
        }

    }


}
