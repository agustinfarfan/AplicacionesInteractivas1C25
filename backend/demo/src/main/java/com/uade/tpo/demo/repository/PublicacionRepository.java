package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Publicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
    //List<Publicacion> findByVendedorId(Long vendedorId);
    List<Publicacion> findByProductoId(Long productoId);
}