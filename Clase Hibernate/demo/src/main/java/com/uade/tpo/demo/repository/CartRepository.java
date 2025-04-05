package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartRepository extends JpaRepository<Carrito, Long> {

    @Query(value = "select c from Carrito c where c.usuario.id = ?1 and c.estado = 'ACTIVO' ")
    Carrito findByUserId(Long id);

}
