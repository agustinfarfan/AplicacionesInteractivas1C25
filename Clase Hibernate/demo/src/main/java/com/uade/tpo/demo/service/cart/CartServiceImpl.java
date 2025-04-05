package com.uade.tpo.demo.service.cart;


import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.CarritoDetalle;
import com.uade.tpo.demo.entity.Producto;
import com.uade.tpo.demo.entity.Usuario;
import com.uade.tpo.demo.entity.dto.AddProductRequest;
import com.uade.tpo.demo.exceptions.CartProductQuantityException;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.CartDetailsRepository;
import com.uade.tpo.demo.repository.CartRepository;
import com.uade.tpo.demo.repository.ProductoRepository;
import com.uade.tpo.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private CartDetailsRepository cartDetailsRepository;

    public Page<Carrito> getAllCarts(PageRequest pageable) {
        return cartRepository.findAll(pageable);
    }

    public Optional<Carrito> getCartById(Long cartId) {
        return cartRepository.findById(cartId);
    }

    public Long createCart(Long userId) {

        Usuario usuario = usuarioRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + userId));

        Carrito carrito = cartRepository.save(new Carrito(usuario));

        return carrito.getId();
    }

    public Carrito addProductToCart(Long cartId, AddProductRequest request) throws CartProductQuantityException, ResourceNotFoundException {

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
        List<CarritoDetalle> carritoDetalles = carrito.getCarritoDetalle();
        AtomicBoolean existe = new AtomicBoolean(false);

        carritoDetalles.forEach(carritoDetalle -> {
            if (carritoDetalle.tieneProducto(request.getProductId())) {
                carritoDetalle.sumarCantidad(request.getCantidad());
                cartDetailsRepository.save(carritoDetalle);
                existe.set(true);
            }
        });

        // Agregar carrito detalle al carrito si no existe.
        if (!existe.get()) {
            CarritoDetalle carritoDetalle = new CarritoDetalle(producto, request.getCantidad());
            carrito.agregarDetalle(carritoDetalle);
            cartRepository.save(carrito);
        }

        return carrito;
    }


    public Carrito deleteProductFromCart(Long cartId, Long productId) throws ResourceNotFoundException {
        Carrito carrito = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con Id: " + cartId));

        // Eliminar cuando haya clase en productoService
        Producto producto = productoRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con Id: " + productId));;



        return new Carrito(new Usuario());
    }
}
