package com.uade.tpo.demo.service;

import java.util.List;

import com.uade.tpo.demo.entity.Producto;

public interface ProductService {
    List<Producto> obtenerTodos();
    List<Producto> obtenerPorCategoria(Long categoriaId);
    Producto obtenerPorId(Long id);
    Producto crearProducto(Producto producto);
    Producto actualizarProducto(Long id, Producto productoActualizado);
    void eliminarProducto(Long id);
}
