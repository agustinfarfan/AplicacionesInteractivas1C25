package com.uade.tpo.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uade.tpo.demo.entity.Producto;

public interface ProductRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByCategoryId(Long categoriaId);
}
