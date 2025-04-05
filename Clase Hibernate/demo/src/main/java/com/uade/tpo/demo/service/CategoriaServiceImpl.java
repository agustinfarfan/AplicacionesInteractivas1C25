package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import com.uade.tpo.demo.entity.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uade.tpo.demo.exceptions.CategoriaDuplicadaExcepcion;
import com.uade.tpo.demo.exceptions.CategoriaNotFoundExcepcion;
import com.uade.tpo.demo.repository.CategoryRepository;


@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Page<Categoria> getCategorias(PageRequest pageable) {
        return categoryRepository.findAll(pageable);
    }

    @Override
    public Optional<Categoria> getCategoriasById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    @Override
    public Categoria createCategoria(String nombre) throws CategoriaDuplicadaExcepcion {        
        List<Categoria> categories = categoryRepository.findByNombre(nombre);
        if (categories.isEmpty())
            return categoryRepository.save(new Categoria(nombre));
        throw new CategoriaDuplicadaExcepcion();
    }

    @Override
    public void delCategoriaById(Long categoryId) throws CategoriaNotFoundExcepcion {
        Categoria categoria = categoryRepository.findById(categoryId).orElseThrow(CategoriaNotFoundExcepcion::new);
        categoryRepository.delete(categoria);
    }

    @Override
    public List<Categoria> searchCategoriaByNombre(String nombre) throws CategoriaNotFoundExcepcion {
        List<Categoria> categorias = categoryRepository.findByNombre(nombre);
        if (categorias.isEmpty())
            throw new CategoriaNotFoundExcepcion();
        return categorias;
    }

    @Override
    public Categoria updateCategoria(Long id, String nombre, String descripcion)
            throws CategoriaNotFoundExcepcion {

        Categoria categoria = categoryRepository.findById(id).orElseThrow(CategoriaNotFoundExcepcion::new);

        if (nombre != null) categoria.setNombre(nombre);
        if (descripcion != null) categoria.setDescripcion(descripcion);

        return categoryRepository.save(categoria);
    }

    
}
