package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Cliente;
import com.uade.tpo.demo.entity.dto.ClienteRequest;
import com.uade.tpo.demo.exceptions.ClienteDuplicadoExcepcion;
import com.uade.tpo.demo.exceptions.ClienteNotFoundExcepcion;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ClienteService {

    Page<Cliente> getClientes(PageRequest pageRequest);

    Optional<Cliente> getClienteById(Long id);

    Cliente createCliente(ClienteRequest request) throws ClienteDuplicadoExcepcion;

    Cliente updateCliente(Long id, ClienteRequest request) throws ClienteNotFoundExcepcion;

    void deleteClienteById(Long id) throws ClienteNotFoundExcepcion;

    List<Cliente> getClientesByRazonSocial(String razonSocial);
}