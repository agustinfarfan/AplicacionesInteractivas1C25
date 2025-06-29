package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Cupon;
import com.uade.tpo.demo.entity.dto.CreateCuponRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CuponRepository extends JpaRepository<Cupon, Long> {
    Optional<Cupon> findByNombre(String nombre);
    Cupon save(CreateCuponRequest request);
}
