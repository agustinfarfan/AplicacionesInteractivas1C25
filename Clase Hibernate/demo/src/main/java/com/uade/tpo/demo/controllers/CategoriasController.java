package com.uade.tpo.demo.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uade.tpo.demo.entity.Categoria;
import com.uade.tpo.demo.entity.dto.CategoriaRequest;
import com.uade.tpo.demo.exceptions.CategoriaNotFoundExcepcion;
import com.uade.tpo.demo.exceptions.CategoriaDuplicadaExcepcion;
import com.uade.tpo.demo.service.CategoriaService;

@RestController
@RequestMapping("categories")
public class CategoriasController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<Page<Categoria>> getCategories(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page == null || size == null)
            return ResponseEntity.ok(categoriaService.getCategorias(PageRequest.of(0, Integer.MAX_VALUE)));
        return ResponseEntity.ok(categoriaService.getCategorias(PageRequest.of(page, size)));
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Categoria> getCategoryById(@PathVariable Long categoryId) {
        Optional<Categoria> result = categoriaService.getCategoriasById(categoryId);
        if (result.isPresent())
            return ResponseEntity.ok(result.get());

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Categoria>> searchCategoriaByNombre(@PathVariable String categoryName) 
            throws CategoriaNotFoundExcepcion {
        List<Categoria> result = categoriaService.searchCategoriaByNombre(categoryName);
        if (!result.isEmpty())
            return ResponseEntity.ok(result);

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Object> createCategoria(@RequestBody CategoriaRequest categoriaRequest)
            throws CategoriaDuplicadaExcepcion {
        Categoria result = categoriaService.createCategoria(categoriaRequest.getNombre());
        return ResponseEntity.created(URI.create("/categories/" + result.getId())).body(result);
    }
    
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Object> delCategoriaById(@PathVariable Long categoryId)
            throws CategoriaNotFoundExcepcion {
                categoriaService.delCategoriaById(categoryId);
                return ResponseEntity.noContent().build();
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long categoryId, @RequestBody CategoriaRequest categoriaRequest)
            throws CategoriaNotFoundExcepcion {
        return ResponseEntity.ok(categoriaService.updateCategoria(categoryId,categoriaRequest.getNombre(),categoriaRequest.getDescripcion()));
    }
}