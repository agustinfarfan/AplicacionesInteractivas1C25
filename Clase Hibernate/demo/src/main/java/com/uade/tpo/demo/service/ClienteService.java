package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Categoria;
import com.uade.tpo.demo.exceptions.CategoriaNotFoundExcepcion;
import com.uade.tpo.demo.exceptions.CategoriaDuplicadaExcepcion;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ClienteService {
    Page<Categoria> getCategorias(PageRequest pageRequest);

    Optional<Categoria> getCategoriasById(Long categoryId);

    Categoria createCategoria(String nombre) throws CategoriaDuplicadaExcepcion;

    void delCategoriaById(Long categoryId) throws CategoriaNotFoundExcepcion;

    //CREO QUE LA EXCEPCION DA ACA NO HACE FALTA POR EL .ok y .noContent() EN EL CONTROLADOR
    public List<Categoria> searchCategoriaByNombre(String nombre) throws CategoriaNotFoundExcepcion;

    Categoria updateCategoria(Long id, String nombre, String descripcion) throws CategoriaNotFoundExcepcion;
}