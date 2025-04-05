package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Carrito;
import com.uade.tpo.demo.entity.CarritoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartDetailsRepository extends JpaRepository<CarritoDetalle, Long> {

    @Query(value = "select c from CarritoDetalle c where c.carrito.id = ?1")
    List<CarritoDetalle> findByCartId(Long id);
}
