package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Carrito, Long> {

    @Query(value = "select c from Carrito c where c.User.id = ?1 and c.estado = 'ACTIVO' ")
    Optional<Carrito> findByUserId(Long id);

    void deleteAllByExpirationDateBefore(LocalDateTime date);
}
