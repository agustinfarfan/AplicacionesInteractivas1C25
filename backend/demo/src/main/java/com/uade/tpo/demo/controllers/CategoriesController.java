package com.uade.tpo.demo.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uade.tpo.demo.entity.Category;
import com.uade.tpo.demo.entity.dto.CategoriesRequest;
import com.uade.tpo.demo.exceptions.CategoryNotFoundException;
import com.uade.tpo.demo.exceptions.CategoryDuplicatedException;
import com.uade.tpo.demo.service.CategoryService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("categories")
public class CategoriesController {

    @Autowired
    private CategoryService categoriaService;

    @GetMapping
    public ResponseEntity<Page<Category>> getCategories(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page == null || size == null)
            return ResponseEntity.ok(categoriaService.getCategorias(PageRequest.of(0, Integer.MAX_VALUE)));
        return ResponseEntity.ok(categoriaService.getCategorias(PageRequest.of(page, size)));
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long categoryId) {
        Optional<Category> result = categoriaService.getCategoriasById(categoryId);
        if (result.isPresent())
            return ResponseEntity.ok(result.get());

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Category>> searchCategoriaByNombre(@PathVariable String categoryName) 
            throws CategoryNotFoundException {
        List<Category> result = categoriaService.searchCategoriaByNombre(categoryName);
        if (!result.isEmpty())
            return ResponseEntity.ok(result);

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Object> createCategoria(@RequestBody CategoriesRequest categoriaRequest)
            throws CategoryDuplicatedException {
        Category result = categoriaService.createCategoria(categoriaRequest.getNombre());
        return ResponseEntity.created(URI.create("/categories/" + result.getId())).body(result);
    }
    
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Object> delCategoriaById(@PathVariable Long categoryId)
            throws CategoryNotFoundException {
                categoriaService.delCategoriaById(categoryId);
                return ResponseEntity.noContent().build();
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> actualizarCategoria(@PathVariable Long categoryId, @RequestBody CategoriesRequest categoriaRequest)
            throws CategoryNotFoundException {
        return ResponseEntity.ok(categoriaService.updateCategoria(categoryId,categoriaRequest.getNombre(),categoriaRequest.getDescripcion()));
    }
}