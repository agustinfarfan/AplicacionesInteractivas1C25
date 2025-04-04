package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
