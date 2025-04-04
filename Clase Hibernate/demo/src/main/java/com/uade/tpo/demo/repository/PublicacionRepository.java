package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Publicacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
}
