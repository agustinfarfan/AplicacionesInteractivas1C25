package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import com.uade.tpo.demo.entity.Category;
import com.uade.tpo.demo.entity.dto.CategoriesRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uade.tpo.demo.exceptions.CategoryDuplicatedException;
import com.uade.tpo.demo.exceptions.CategoryNotFoundException;
import com.uade.tpo.demo.repository.CategoryRepository;


@Service
public class CategoriaServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Page<Category> getCategorias(PageRequest pageRequest) {
        return categoryRepository.findAll(pageRequest);
    }

    @Override
    public Optional<Category> getCategoriasById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category createCategoria(CategoriesRequest request) throws CategoryDuplicatedException {
        List<Category> categories = categoryRepository.findByName(request.getNombre());
        if (categories.isEmpty())
            return categoryRepository.save(new Category(request.getNombre(), request.getDescripcion()));
        throw new CategoryDuplicatedException();
    }

    @Override
    public void delCategoriaById(Long categoryId) throws CategoryNotFoundException {
        Category categoria = categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        categoryRepository.delete(categoria);
    }

    @Override
    public List<Category> searchCategoriaByNombre(String nombre) throws CategoryNotFoundException {
        List<Category> categorias = categoryRepository.findByName(nombre);
        if (categorias.isEmpty())
            throw new CategoryNotFoundException();
        return categorias;
    }

    @Override
    public Category updateCategoria(Long id, String nombre, String descripcion)
            throws CategoryNotFoundException {

                Category categoria = categoryRepository.findById(id).orElseThrow(CategoryNotFoundException::new);

        if (nombre != null) categoria.setName(nombre);
        if (descripcion != null) categoria.setDescription(descripcion);

        return categoryRepository.save(categoria);
    }

    
}
