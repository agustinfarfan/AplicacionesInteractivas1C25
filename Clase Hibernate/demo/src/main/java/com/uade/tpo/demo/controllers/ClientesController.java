package com.uade.tpo.demo.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uade.tpo.demo.entity.Category;
import com.uade.tpo.demo.entity.Cliente;
import com.uade.tpo.demo.entity.dto.CategoriesRequest;
import com.uade.tpo.demo.entity.dto.ClienteRequest;
import com.uade.tpo.demo.exceptions.CategoryNotFoundException;
import com.uade.tpo.demo.exceptions.ClienteDuplicadoExcepcion;
import com.uade.tpo.demo.exceptions.ClienteNotFoundExcepcion;
import com.uade.tpo.demo.exceptions.CategoryDuplicatedException;
import com.uade.tpo.demo.service.CategoryService;
import com.uade.tpo.demo.service.ClienteService;

@RestController
@RequestMapping("clientes")
public class ClientesController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<Page<Cliente>> getClientes(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page == null || size == null)
            return ResponseEntity.ok(clienteService.getClientes(PageRequest.of(0, Integer.MAX_VALUE)));
        return ResponseEntity.ok(clienteService.getClientes(PageRequest.of(page, size)));
    }

    @GetMapping("/{clienteId}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long clienteId) throws ClienteNotFoundExcepcion {
        Optional<Cliente> result = clienteService.getClienteById(clienteId);
        return result.map(ResponseEntity::ok).orElseThrow(ClienteNotFoundExcepcion::new);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Cliente>> searchClienteByRazonSocial(@RequestParam String razonSocial) {
        List<Cliente> clientes = clienteService.getClientesByRazonSocial(razonSocial);
        return ResponseEntity.ok(clientes);
    }

    @PostMapping
    public ResponseEntity<Object> createCliente(@RequestBody ClienteRequest clienteRequest) throws ClienteDuplicadoExcepcion {
                Cliente result = clienteService.createCliente(clienteRequest);
                return ResponseEntity.created(URI.create("/clientes/" + result.getId())).body(result);
    }
    
    @DeleteMapping("/{clienteId}")
    public ResponseEntity<Object> deleteCliente(@PathVariable Long clienteId)
            throws ClienteNotFoundExcepcion {
                clienteService.deleteClienteById(clienteId);
                return ResponseEntity.noContent().build();
    }

    @PutMapping("/{clienteId}")
    public ResponseEntity<Cliente> actualizarCliente(@PathVariable Long clienteId, @RequestBody ClienteRequest clienteRequest)
            throws ClienteNotFoundExcepcion {
        return ResponseEntity.ok(clienteService.updateCliente(clienteId,clienteRequest));
    }
}