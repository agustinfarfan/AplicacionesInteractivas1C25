package com.uade.tpo.demo.controllers;

import com.uade.tpo.demo.entity.Producto;
import com.uade.tpo.demo.entity.Publicacion;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.PublicacionRequest;
import com.uade.tpo.demo.repository.ProductoRepository;
import com.uade.tpo.demo.repository.UserRepository;
import com.uade.tpo.demo.service.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/publicaciones")
public class PublicacionController {

    @Autowired
    private PublicacionService publicacionService;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UserRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<Publicacion>> getAllPublicaciones() {
        return ResponseEntity.ok(publicacionService.getAllPublicaciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publicacion> getPublicacionById(@PathVariable Long id) {
        Optional<Publicacion> publicacion = publicacionService.getPublicacionById(id);
        return publicacion.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping
    public ResponseEntity<Publicacion> createPublicacion(@RequestBody PublicacionRequest publicacionRequest) {
        Producto producto = productoRepository.findById(publicacionRequest.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        User vendedor = usuarioRepository.findById(publicacionRequest.getVendedorId())
                .orElseThrow(() -> new RuntimeException("Vendedor no encontrado"));

        Publicacion publicacion = new Publicacion();
        publicacion.setProducto(producto);
        publicacion.setFechaPublicacion(new Date());

        Publicacion newPublicacion = publicacionService.createPublicacion(publicacion);
        return ResponseEntity.created(URI.create("/publicaciones/" + newPublicacion.getId())).body(newPublicacion);
    }

//    @PutMapping("/{id}/estado")
//    public ResponseEntity<Publicacion> updateEstado(@PathVariable Long id, @RequestParam String estado) {
//        Publicacion updatedPublicacion = publicacionService.updateEstado(id, estado);
//        return updatedPublicacion != null ? ResponseEntity.ok(updatedPublicacion) : ResponseEntity.notFound().build();
//    }

    @PutMapping("/{id}/visible")
    public ResponseEntity<Publicacion> updateVisible(@PathVariable Long id, @RequestParam boolean visible) {
        Publicacion updatedPublicacion = publicacionService.updateVisible(id, visible);
        return updatedPublicacion != null ? ResponseEntity.ok(updatedPublicacion) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublicacion(@PathVariable Long id) {
        publicacionService.deletePublicacion(id);
        return ResponseEntity.noContent().build();
    }
}



