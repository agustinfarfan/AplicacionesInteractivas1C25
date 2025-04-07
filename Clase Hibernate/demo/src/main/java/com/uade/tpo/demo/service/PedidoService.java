package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Pedido;
import java.util.List;
import java.util.Optional;

public interface PedidoService {
    public List<Pedido> getAllPedidos();

    public Optional<Pedido> getPedidoById(Long id);

    public Pedido createPedido(Pedido pedido);
    
    public void deletePedido(Long id);
}