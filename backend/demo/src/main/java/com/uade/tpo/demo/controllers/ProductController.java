package com.uade.tpo.demo.controllers;

import java.util.List;

import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.demo.entity.Category;
import com.uade.tpo.demo.entity.Producto;
import com.uade.tpo.demo.entity.dto.ProductRequest;
import com.uade.tpo.demo.service.CategoryService;
import com.uade.tpo.demo.service.ProductService;

@RestController
@RequestMapping("/productos")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Producto> obtenerTodos() {
        return productService.obtenerTodos();
    }

    @GetMapping("/categoria/{categoriaId}")
    public List<Producto> obtenerPorCategoria(@PathVariable Long categoriaId) {
        return productService.obtenerPorCategoria(categoriaId);
    }

    @GetMapping("/{id}")
    public Producto obtenerPorId(@PathVariable Long id) {
        return productService.obtenerPorId(id);
    }

    @PostMapping
    public Producto crearProducto(@RequestBody ProductRequest request) {
        System.out.println(request);
        Category categoria = categoryService.getCategoriasById(request.getCategoriaId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con id: " + request.getCategoriaId()));

        Producto producto = new Producto();
        producto.setNombre(request.getNombre());
        producto.setDescription(request.getDescription());
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());
        producto.setCategory(categoria);

        return productService.crearProducto(producto);
    }

    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable Long id, @RequestBody ProductRequest request) {
        Category categoria = categoryService.getCategoriasById(request.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id: " + request.getCategoriaId()));

        Producto productoActualizado = new Producto();
        productoActualizado.setNombre(request.getNombre());
        productoActualizado.setDescription(request.getDescription());
        productoActualizado.setPrecio(request.getPrecio());
        productoActualizado.setStock(request.getStock());
        productoActualizado.setCategory(categoria);

        return productService.actualizarProducto(id, productoActualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productService.eliminarProducto(id);
    }
}
