package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
