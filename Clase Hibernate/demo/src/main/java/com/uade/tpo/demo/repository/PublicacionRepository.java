package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Publicacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
    List<Publicacion> findByVendedorId(Long vendedorId);
    List<Publicacion> findByProductoId(Long productoId);
}