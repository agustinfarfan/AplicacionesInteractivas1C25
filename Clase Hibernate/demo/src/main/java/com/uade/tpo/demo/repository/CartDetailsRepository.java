package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.CarritoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartDetailsRepository extends JpaRepository<CarritoDetalle, Long> {
}
