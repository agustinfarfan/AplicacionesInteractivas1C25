package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import com.uade.tpo.demo.entity.Cliente;
import com.uade.tpo.demo.entity.dto.ClienteRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uade.tpo.demo.exceptions.ClienteDuplicadoExcepcion;
import com.uade.tpo.demo.exceptions.ClienteNotFoundExcepcion;
import com.uade.tpo.demo.repository.ClienteRepository;


@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public Page<Cliente> getClientes(PageRequest pageRequest) {
        return clienteRepository.findAll(pageRequest);
    }

    @Override
    public Optional<Cliente> getClienteById(Long id) {
        return clienteRepository.findById(id);
    }

    @Override
    public Cliente createCliente(ClienteRequest request) throws ClienteDuplicadoExcepcion {
        if(clienteRepository.findByCuil(request.getCuil()) == null){
            return clienteRepository.save(new Cliente(request.getRazonSocial(),request.getCuil()));
        }else{
            throw new ClienteDuplicadoExcepcion();
        }
    }

    @Override
    public Cliente updateCliente(Long id, ClienteRequest request) throws ClienteNotFoundExcepcion {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(ClienteNotFoundExcepcion::new);

        if (request.getRazonSocial() != null) cliente.setRazonSocial(request.getRazonSocial());
        if (request.getCalle() != null) cliente.setCalle(request.getCalle());
        if (request.getAltura() != null) cliente.setAltura(request.getAltura());
        if (request.getCodigoPostal() != null) cliente.setCodigoPostal(request.getCodigoPostal());
        if (request.getLocalidad() != null) cliente.setLocalidad(request.getLocalidad());
        if (request.getProvincia() != null) cliente.setProvincia(request.getProvincia());

        return clienteRepository.save(cliente);
    }

    @Override
    public void deleteClienteById(Long id) throws ClienteNotFoundExcepcion {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(ClienteNotFoundExcepcion::new);
        clienteRepository.delete(cliente);
    }

    @Override
    public List<Cliente> getClientesByRazonSocial(String razonSocial) {
        return clienteRepository.findByRazonSocialContainingIgnoreCase(razonSocial);
    }

    

    
}
