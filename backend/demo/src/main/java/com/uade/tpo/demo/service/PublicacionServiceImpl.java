package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.Publicacion;
import com.uade.tpo.demo.repository.PublicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PublicacionServiceImpl implements PublicacionService {

    @Autowired
    private PublicacionRepository publicacionRepository;

    @Override
    public List<Publicacion> getAllPublicaciones() {
        return publicacionRepository.findAll();
    }

    @Override
    public Optional<Publicacion> getPublicacionById(Long id) {
        return publicacionRepository.findById(id);
    }

    @Override
    public Publicacion updateEstado(Long id, String nuevoEstado) {
//        Optional<Publicacion> publicacion = publicacionRepository.findById(id);
//        if (publicacion.isPresent()) {
//            Publicacion updated = publicacion.get();
//            updated.setEstado(nuevoEstado);
//            return publicacionRepository.save(updated);
//        }
        return null;
    }

    @Override
    public Publicacion updateVisible(Long id, boolean visible) {
        Optional<Publicacion> publicacion = publicacionRepository.findById(id);
        if (publicacion.isPresent()) {
            Publicacion updated = publicacion.get();
            updated.setVisible(visible);
            return publicacionRepository.save(updated);
        }
        return null;
    }

    @Override
    public Publicacion createPublicacion(Publicacion publicacion) {
        return publicacionRepository.save(publicacion);
    }

    @Override
    public void deletePublicacion(Long id) {
        publicacionRepository.deleteById(id);
    }
}
