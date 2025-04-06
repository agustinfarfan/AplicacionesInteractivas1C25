package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUserId(Long userId);
}
