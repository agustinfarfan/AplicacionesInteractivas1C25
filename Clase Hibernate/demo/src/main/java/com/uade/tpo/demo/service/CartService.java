package com.uade.tpo.demo.service;


import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.Categoria;
import com.uade.tpo.demo.entity.Usuario;
import com.uade.tpo.demo.exceptions.CategoryDuplicateException;
import com.uade.tpo.demo.repository.CartRepository;
import com.uade.tpo.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

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


}
