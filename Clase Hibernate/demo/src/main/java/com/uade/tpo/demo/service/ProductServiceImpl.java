package com.uade.tpo.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uade.tpo.demo.entity.Producto;
import com.uade.tpo.demo.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Producto> obtenerTodos() {
        return productRepository.findAll();
    }

    @Override
    public List<Producto> obtenerPorCategoria(Long categoriaId) {
        return productRepository.findByCategoryId(categoriaId);
    }

    @Override
    public Producto obtenerPorId(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
    }

    @Override
    public Producto crearProducto(Producto producto) {
        return productRepository.save(producto);
    }

    @Override
    public Producto actualizarProducto(Long id, Producto productoActualizado) {
        Producto producto = obtenerPorId(id);
        producto.setNombre(productoActualizado.getNombre());
        producto.setDescription(productoActualizado.getDescription());
        producto.setPrecio(productoActualizado.getPrecio());
        producto.setStock(productoActualizado.getStock());
        producto.setCategory(productoActualizado.getCategory());
        return productRepository.save(producto);
    }

    @Override
    public void eliminarProducto(Long id) {
        productRepository.deleteById(id);
    }
}
