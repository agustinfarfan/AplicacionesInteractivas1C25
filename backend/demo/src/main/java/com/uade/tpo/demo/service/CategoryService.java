package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Category;
import com.uade.tpo.demo.exceptions.CategoryNotFoundException;
import com.uade.tpo.demo.exceptions.CategoryDuplicatedException;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface CategoryService {
    Page<Category> getCategorias(PageRequest pageRequest);

    Optional<Category> getCategoriasById(Long categoryId);

    Category createCategoria(String nombre, String description) throws CategoryDuplicatedException;

    void delCategoriaById(Long categoryId) throws CategoryNotFoundException;

    //CREO QUE LA EXCEPCION DA ACA NO HACE FALTA POR EL .ok y .noContent() EN EL CONTROLADOR
    public List<Category> searchCategoriaByNombre(String nombre) throws CategoryNotFoundException;

    Category updateCategoria(Long id, String nombre, String descripcion) throws CategoryNotFoundException;
}