package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Publicacion;
import java.util.List;
import java.util.Optional;

public interface PublicacionService {
    public List<Publicacion> getAllPublicaciones();

    public Optional<Publicacion> getPublicacionById(Long id);

    public Publicacion updateEstado(Long id, String nuevoEstado);

    public Publicacion updateVisible(Long id, boolean visible);

    public Publicacion createPublicacion(Publicacion publicacion);
    
    public void deletePublicacion(Long id);
}
