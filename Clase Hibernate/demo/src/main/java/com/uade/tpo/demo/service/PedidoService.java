package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Pedido;
import java.util.List;
import java.util.Optional;

public interface PedidoService {
    List<Pedido> getAllPedidos();

    Optional<Pedido> getPedidoById(Long id);

    Pedido createPedido(Pedido pedido);
    
    void deletePedido(Long id);
}