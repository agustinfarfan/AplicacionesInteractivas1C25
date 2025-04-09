package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.DetalleOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleOrderRepository extends JpaRepository<DetalleOrder, Long> {
}
