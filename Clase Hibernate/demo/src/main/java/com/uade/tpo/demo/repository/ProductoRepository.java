package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
