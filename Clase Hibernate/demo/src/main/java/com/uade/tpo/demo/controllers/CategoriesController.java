package com.uade.tpo.demo.controllers;

import com.uade.tpo.demo.entity.Categoria;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.demo.entity.dto.CategoryRequest;
import com.uade.tpo.demo.exceptions.CategoryDuplicateException;
import com.uade.tpo.demo.service.CategoryService;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("categories")
public class CategoriesController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<Page<Categoria>> getCategories(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page == null || size == null)
            return ResponseEntity.ok(categoryService.getCategories(PageRequest.of(0, Integer.MAX_VALUE)));
        return ResponseEntity.ok(categoryService.getCategories(PageRequest.of(page, size)));
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Categoria> getCategoryById(@PathVariable Long categoryId) {
        Optional<Categoria> result = categoryService.getCategoryById(categoryId);
        if (result.isPresent())
            return ResponseEntity.ok(result.get());

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Object> createCategory(@RequestBody CategoryRequest categoryRequest)
            throws CategoryDuplicateException {
        Categoria result = categoryService.createCategory(categoryRequest.getDescription());
        return ResponseEntity.created(URI.create("/categories/" + result.getId())).body(result);
    }
}
