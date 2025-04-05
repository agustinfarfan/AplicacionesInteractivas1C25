package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Publicacion;
import java.util.List;
import java.util.Optional;

public interface PublicacionService {
    List<Publicacion> getAllPublicaciones();

    Optional<Publicacion> getPublicacionById(Long id);

    Publicacion updateEstado(Long id, String nuevoEstado);

    Publicacion updateVisible(Long id, boolean visible);

    Publicacion createPublicacion(Publicacion publicacion);
    
    void deletePublicacion(Long id);
}
