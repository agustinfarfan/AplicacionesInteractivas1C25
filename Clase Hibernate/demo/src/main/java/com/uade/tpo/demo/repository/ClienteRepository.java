package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Cliente;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    @Query(value = "select c from Cliente c where c.cuil = ?1")
    Cliente findByCuil(String cuil);

    List<Cliente> findByRazonSocialContainingIgnoreCase(String razonSocial);
}
