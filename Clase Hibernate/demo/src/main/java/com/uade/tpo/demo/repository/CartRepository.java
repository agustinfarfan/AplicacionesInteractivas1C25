package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Carrito, Long> {
}
