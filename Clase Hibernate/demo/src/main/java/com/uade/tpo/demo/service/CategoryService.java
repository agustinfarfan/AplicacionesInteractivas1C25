
package com.uade.tpo.demo.service;

import java.util.Optional;

import com.uade.tpo.demo.entity.Categoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.uade.tpo.demo.exceptions.CategoryDuplicateException;

public interface CategoryService {
    public Page<Categoria> getCategories(PageRequest pageRequest);

    public Optional<Categoria> getCategoryById(Long categoryId);

    public Categoria createCategory(String description) throws CategoryDuplicateException;
}