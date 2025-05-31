package com.uade.tpo.demo.repository;

import java.util.List;

import com.uade.tpo.demo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    //@Query(value = "select c from category c where c.nombre = ?1")
    List<Category> findByName(String nombre);
}
