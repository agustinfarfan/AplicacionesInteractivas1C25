package com.uade.tpo.demo.repository;

import java.util.List;

import com.uade.tpo.demo.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Categoria, Long> {

    @Query(value = "select c from Categoria c where c.description = ?1")
    List<Categoria> findByDescription(String description);
}
