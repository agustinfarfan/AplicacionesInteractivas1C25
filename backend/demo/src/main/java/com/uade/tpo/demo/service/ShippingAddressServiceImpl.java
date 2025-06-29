package com.uade.tpo.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import com.uade.tpo.demo.repository.ShippingAddressRepository;
import com.uade.tpo.demo.repository.UserRepository;
import com.uade.tpo.demo.entity.ShippingAddress;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.ShippingAddressRequest;
import com.uade.tpo.demo.entity.dto.ShippingAddressDTO;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShippingAddressServiceImpl implements ShippingAddressService {

    @Autowired
    private ShippingAddressRepository addrRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<ShippingAddressDTO> listByUser(Long userId) {
        return addrRepo.findByUserId(userId).stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    public ShippingAddressDTO create(Long userId, ShippingAddressRequest req) {
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        ShippingAddress addr = ShippingAddress.builder()
            .alias(req.getAlias())
            .calle(req.getCalle())
            .altura(req.getAltura())
            .codigoPostal(req.getCodigoPostal())
            .localidad(req.getLocalidad())
            .provincia(req.getProvincia())
            .user(user)
            .build();

        return toResponse(addrRepo.save(addr));
    }

    @Override
    public ShippingAddressDTO update(Long id, ShippingAddressRequest req) {
        ShippingAddress addr = addrRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Dirección no encontrada"));

        addr.setAlias(req.getAlias());
        addr.setCalle(req.getCalle());
        addr.setAltura(req.getAltura());
        addr.setCodigoPostal(req.getCodigoPostal());
        addr.setLocalidad(req.getLocalidad());
        addr.setProvincia(req.getProvincia());

        return toResponse(addrRepo.save(addr));
    }

    @Override
    public void delete(Long id) {
        ShippingAddress addr = addrRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Dirección no encontrada"));
         addrRepo.delete(addr);
    }

    private ShippingAddressDTO toResponse(ShippingAddress a) {
        return ShippingAddressDTO.builder()
            .id(a.getId())
            .alias(a.getAlias())
            .calle(a.getCalle())
            .altura(a.getAltura())
            .codigoPostal(a.getCodigoPostal())
            .localidad(a.getLocalidad())
            .provincia(a.getProvincia())
            .build();
    }
}
