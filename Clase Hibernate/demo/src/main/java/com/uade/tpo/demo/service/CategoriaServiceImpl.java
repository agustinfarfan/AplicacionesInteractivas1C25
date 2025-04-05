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
        System.out.println("Dentro de createCategori CategoriaServiceImpl nombre: " + nombre);
        List<Categoria> categories = categoryRepository.findByNombre(nombre);
        if (categories.isEmpty())
            return categoryRepository.save(new Categoria(nombre));
        throw new CategoriaDuplicadaExcepcion();
    }

    @Override
    public void delCategoriaById(Long categoryId) throws CategoriaNotFoundExcepcion {
        Optional<Categoria> categoria = categoryRepository.findById(categoryId);
        if (categoria.isPresent()) {
            categoryRepository.deleteById(categoryId);
        }else{
            throw new CategoriaNotFoundExcepcion();
        }
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
        Optional<Categoria> categoria = categoryRepository.findById(id);
        
        if (categoria != null) {
            if (nombre != null) {
                categoria.get().setNombre(nombre);
            }
            if (descripcion != null) {
                categoria.get().setDescripcion(descripcion);
            }

        }else{
            throw new CategoriaNotFoundExcepcion();
        }
        return categoryRepository.save(categoria.get());
    }

    
}
